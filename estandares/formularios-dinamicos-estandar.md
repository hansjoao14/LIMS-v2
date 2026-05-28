# Estándar para la Construcción de Formularios Dinámicos — Sistema LIMS

## 1. Propósito

Este documento define el contrato técnico para construir, renderizar y procesar formularios dinámicos en el sistema LIMS. Cualquier componente que necesite mostrar un formulario configurable desde la base de datos debe seguir este estándar.

---

## 2. Contrato de la API

### Endpoint

```
GET /api/reportes/report-parametro/formulario-dinamico/:idFormulario
```

### Respuesta esperada

```json
{
  "data": [
    {
      "formulario_id": "380",
      "formulario_nombre": "Solicitud de Trabajo",
      "tipo_formulario": "Laboratorio",
      "tipo_formulario_id": 1,
      "preguntas": [ ...Pregunta[] ]
    }
  ]
}
```

### Estructura de `Pregunta`

| Campo                  | Tipo                    | Descripción                                              |
|------------------------|-------------------------|----------------------------------------------------------|
| `id`                   | `string`                | ID único del atributo en BD                              |
| `nombre`               | `string`                | Clave del control en el `FormGroup` (snake_case)         |
| `pregunta`             | `string`                | Etiqueta visible al usuario                              |
| `orden`                | `number`                | Posición de renderizado (ascendente)                     |
| `tipo_respuesta`       | `string`                | Tipo semántico: `Texto`, `Fecha`, `Numerico`, `Selección Simple`, `Selección Mutiple` |
| `tipo_respuesta_id`    | `number`                | ID del catálogo del tipo de respuesta                    |
| `obligatorio`          | `boolean`               | Si el campo es requerido                                 |
| `hidden`               | `boolean`               | Si el campo inicia oculto                                |
| `readonly`             | `boolean`               | Si el campo es solo lectura                              |
| `estado`               | `boolean`               | `false` = excluir del formulario                         |
| `num_caracter`         | `number \| null`        | Máximo de caracteres (>200 → textarea)                   |
| `ayuda`                | `string \| null`        | Placeholder / texto de ayuda                             |
| `catalogos`            | `CatalogoItem[] \| null`| Opciones para selects                                    |
| `jornada_laboral_item` | `JornadaItem[] \| null` | Ítems para selectores de horario                         |
| `atributo_id`          | `string \| null`        | ID de la pregunta padre para dependencias                |
| `item_catalogo_id`     | `string \| null`        | Valor del padre que dispara la visibilidad               |
| `is_ws_sri`            | `boolean`               | Habilita búsqueda SRI al presionar Enter                 |
| `is_ws_civil`          | `boolean`               | Habilita búsqueda Registro Civil al presionar Enter      |
| `is_ws_iess`           | `boolean`               | Habilita búsqueda IESS al presionar Enter                |

---

## 3. Tipos de Campo (`controlType`)

El motor mapea `tipo_respuesta` a un `controlType` interno:

| `tipo_respuesta`    | `controlType` | Elemento HTML          | Nota                                      |
|---------------------|---------------|------------------------|-------------------------------------------|
| `Texto`             | `text`        | `<input type="text">`  |                                           |
| `Fecha`             | `text`        | `<input type="date">`  | Se diferencia por `source.tipo_respuesta` |
| `Numerico`          | `text`        | `<input type="number">`| Se diferencia por `source.tipo_respuesta` |
| `Selección Simple`  | `select`      | `<select>`             | Opciones desde `catalogos`                |
| `Selección Mutiple` | `schedule`    | Lista personalizada    | Ítems desde `jornada_laboral_item`        |
| Texto largo         | `textarea`    | `<textarea>`           | Condición: `num_caracter > 200`           |
| Coordenadas         | `coordinates` | Doble input + mapa     | Solo para `val_lati` / `val_long`         |

---

## 4. Interfaz `FieldConfig`

El motor trabaja con `FieldConfig[]` internamente. Nunca acceder directamente a `Pregunta[]` fuera de `toFieldConfig()`.

```typescript
interface FieldConfig {
  id: string;
  key: string;                // nombre del control en FormGroup
  label: string;              // pregunta visible
  order: number;
  controlType: 'text' | 'textarea' | 'select' | 'schedule' | 'coordinates';
  section: FieldSectionId;    // agrupación lógica para la vista
  placeholder: string;
  required: boolean;
  readonly: boolean;
  hidden: boolean;            // mutable — el motor lo cambia al aplicar dependencias
  maxLength: number | null;
  options: CatalogoItem[];
  scheduleItems: JornadaItem[];
  dependsOn?: {
    fieldId: string;          // id (no key) del padre
    triggerValue: string;     // valor que hace el campo visible
  };
  integrations: { sri: boolean; civil: boolean; iess: boolean };
  source: Pregunta;           // referencia original de la API
}
```

---

## 5. Flujo de Inicialización

```
ngOnInit()
  └── cargarFormularioDinamico(idFormulario)
        └── SolicitudService.getFormulario(id)
              └── .pipe(map)   → ordena preguntas por orden
              └── .subscribe
                    ├── formulario = response
                    ├── fields = preguntas.filter(estado !== false).map(toFieldConfig)
                    ├── generateControls()    ← agrega controles al FormGroup
                    ├── applyDependencyLogic() ← activa/desactiva según dependencias
                    └── loading = false
```

### `toFieldConfig(pregunta)`

Centraliza toda la transformación `Pregunta → FieldConfig`. No duplicar esta lógica en plantillas ni en otros servicios.

### `generateControls()`

```typescript
private generateControls(): void {
  for (const field of this.fields) {
    if (this.form.contains(field.key)) continue;
    this.form.addControl(
      field.key,
      this.fb.control(
        { value: '', disabled: field.hidden },
        this.buildValidators(field, field.hidden),
      ),
    );
  }
}
```

- Nunca recrear el `FormGroup` completo al cambiar una dependencia; solo activar/desactivar controles.
- Usar `form.getRawValue()` al guardar para incluir controles deshabilitados.

### `buildValidators(field, isHidden)`

```typescript
private buildValidators(field: FieldConfig, isHidden: boolean): ValidatorFn[] {
  if (isHidden) return [];
  const v: ValidatorFn[] = [];
  if (field.required) v.push(Validators.required);
  if (field.maxLength) v.push(Validators.maxLength(field.maxLength));
  return v;
}
```

---

## 6. Sistema de Dependencias

Un campo depende de otro cuando `atributo_id` y `item_catalogo_id` están presentes.

### Regla de visibilidad

```
campo visible  ←→  form.get(padre.key).value === field.dependsOn.triggerValue
campo oculto   ←→  valor distinto al triggerValue
```

### Implementación

```typescript
private applyDependencyLogic(): void {
  this.updateDependentFields();
  this.form.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => this.updateDependentFields());
}

private updateDependentFields(): void {
  for (const field of this.fields) {
    if (!field.dependsOn) {
      this.syncFieldState(field, field.source.hidden);
      continue;
    }
    const parentField = this.fields.find(c => c.id === field.dependsOn!.fieldId);
    const parentValue = parentField ? this.form.get(parentField.key)?.value : null;
    this.syncFieldState(field, String(parentValue ?? '') !== field.dependsOn.triggerValue);
  }
}

private syncFieldState(field: FieldConfig, hidden: boolean): void {
  field.hidden = hidden;
  const control = this.form.get(field.key);
  if (!control) return;
  if (hidden) {
    control.disable({ emitEvent: false });
    control.reset('', { emitEvent: false });
  } else {
    control.enable({ emitEvent: false });
  }
  control.setValidators(this.buildValidators(field, hidden));
  control.updateValueAndValidity({ emitEvent: false });
}
```

**Regla**: al ocultar un campo siempre limpiar su valor (evita enviar datos fantasma al backend).

---

## 7. Renderizado en Plantilla

### Patrón base

```html
@for (field of visibleFields; track field.id) {
  <div [class.col-span-full]="field.controlType === 'textarea'">
    <label [class.text-red-600]="esCampoInvalido(field.key)">
      {{ field.label }}
      @if (field.required) { <span class="text-red-500">*</span> }
    </label>

    @if (field.controlType === 'select') {
      <select [formControlName]="field.key">
        <option value="">Seleccione...</option>
        @for (opt of field.options; track opt.id) {
          <option [value]="opt.id">{{ opt.nombre }}</option>
        }
      </select>
    }

    @if (field.controlType === 'textarea') {
      <textarea [formControlName]="field.key"
                [maxlength]="field.maxLength ?? 9999"></textarea>
    }

    @if (field.controlType === 'text') {
      <input [formControlName]="field.key"
             [type]="getInputType(field)"
             [placeholder]="field.placeholder">
    }
  </div>
}
```

### `getInputType(field): string`

```typescript
getInputType(field: FieldConfig): string {
  const tipo = field.source.tipo_respuesta;
  if (tipo === 'Fecha') return 'date';
  if (tipo === 'Numerico') return 'number';
  return 'text';
}
```

### `visibleFields`

```typescript
get visibleFields(): FieldConfig[] {
  return this.fields.filter(f => !f.hidden);
}
```

Nunca usar `*ngIf="!field.hidden"` directamente en el `@for`; mantener la lógica de visibilidad centralizada en `syncFieldState`.

---

## 8. Integraciones Externas (SRI, Civil, IESS)

Cuando `field.integrations.sri || field.integrations.civil` es `true`, el campo de texto incluye un botón de búsqueda:

```html
@if (field.integrations.sri || field.integrations.civil) {
  <button type="button" (click)="buscarIntegracion(field)">
    <svg .../>  <!-- ícono búsqueda -->
  </button>
}
```

El método `buscarIntegracion(field)` llama al servicio correspondiente y parcheará el formulario con los datos encontrados. El campo acepta Enter como atajo: `(keydown.enter)="buscarIntegracion(field)"`.

---

## 9. Guardar Datos

### Payload mínimo

```typescript
guardar(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const valores: ValorSolicitudItem[] = this.fields
    .filter(f => !f.hidden)
    .map(f => ({
      atributo_formulario_id: f.id,
      valor_texto: String(this.form.getRawValue()[f.key] ?? ''),
    }));

  this.service.guardarValoresSolicitud({ valorSolicitud: valores }).subscribe(...);
}
```

### Campos ID vacíos

Siempre sanear antes de enviar — campos ID vacíos deben ser `null`, no `''`:

```typescript
const payload = {
  ...this.formData,
  atributo_id:      this.formData.atributo_id      || null,
  item_catalogo_id: this.formData.item_catalogo_id || null,
  jornada_id:       this.formData.jornada_id       || null,
};
```

---

## 10. Validación de Estado del Campo

### 10.1 Detección de campo inválido

```typescript
esCampoInvalido(key: string): boolean {
  const c = this.form.get(key);
  return !!c && c.invalid && (c.touched || c.dirty);
}
```

### 10.2 Mensaje de error por tipo

Centraliza todos los mensajes de error en un único método. Devuelve `null` si el campo es válido o no ha sido tocado:

```typescript
getFieldError(key: string): string | null {
  const ctrl = this.form.get(key);
  if (!ctrl || !ctrl.invalid || (!ctrl.touched && !ctrl.dirty)) return null;
  if (ctrl.errors?.['required'])            return 'Este campo es requerido.';
  if (ctrl.errors?.['weekend'])             return 'Solo se permiten días de lunes a viernes.';
  if (ctrl.errors?.['fueraDeRango'])        return 'Solo puede seleccionar días dentro del rango habilitado.';
  if (ctrl.errors?.['retornoAntesSalida'])  return 'La hora de retorno no puede ser anterior a la de salida.';
  return null;
}
```

Agrega únicamente los errores que el componente realmente puede producir. No agregar casos genéricos que nunca ocurrirán.

### 10.3 Clases CSS de estado inválido

Solo el borde cambia a rojo — no se pinta el fondo del campo:

```html
[class.border-red-500]="esCampoInvalido(field.key)"
```

La etiqueta (`<label>`) también cambia de color:

```html
[class.text-red-600]="esCampoInvalido(field.key)"
```

### 10.4 Mensaje debajo del campo

Coloca el span de error **dentro del mismo wrapper `div`** del campo, después del elemento de entrada:

```html
@if (getFieldError(field.key)) {
  <span class="text-red-500 text-[11px] mt-1">{{ getFieldError(field.key) }}</span>
}
```

El mensaje solo aparece después de que el usuario toca o modifica el campo (`touched || dirty`), nunca al cargar el formulario.

### 10.5 Patrón completo por campo

```html
<div class="flex flex-col">
  <label
    class="text-[12px] font-bold text-[#1d2b64] mb-2"
    [class.text-red-600]="esCampoInvalido(field.key)"
  >
    {{ field.label }}
    @if (field.required) { <span class="text-red-500"> *</span> }
  </label>

  <input
    [formControlName]="field.key"
    [type]="getInputType(field)"
    class="w-full bg-[#f1f4f8] border border-slate-200 text-slate-700 p-2.5 rounded text-sm outline-none focus:border-[#1d2b64] transition-colors"
    [class.border-red-500]="esCampoInvalido(field.key)"
  />

  @if (getFieldError(field.key)) {
    <span class="text-red-500 text-[11px] mt-1">{{ getFieldError(field.key) }}</span>
  }
</div>
```

El mismo patrón aplica para `<select>` y `<textarea>` — solo cambia el elemento HTML.

---

## 11. Buenas Prácticas

| Regla | Motivo |
|-------|--------|
| Ordenar preguntas por `orden` en el `map()` del servicio | El backend puede devolver en orden arbitrario |
| Filtrar `estado !== false` antes de mapear | Los campos inactivos no deben aparecer |
| Usar `takeUntil(this.destroy$)` en todas las suscripciones | Previene memory leaks |
| `form.getRawValue()` en lugar de `form.value` al guardar | Incluye controles deshabilitados (campos readonly) |
| No recrear el `FormGroup` para dependencias | Causa parpadeo visual y pérdida de valores |
| Almacenar `hidden` en `FieldConfig`, no en el DOM | Permite consultar el estado desde TypeScript sin acceder al DOM |
| `String(source?.hidden) === 'true'` para campos boolean de API | La API puede devolver `"true"` como string en algunos campos |

---

## 12. Personalización de Layout — Grid con Spans y Reorden

Cuando el diseño visual requiere columnas de ancho variable o un orden distinto al `orden` de la API, usa estos tres patrones juntos.

### 12.1 Reordenar campos (`DISPLAY_ORDER`)

La API puede devolver un `orden` que no coincide con el layout deseado. Declara un mapa con la posición visual y aplica un `.sort()` al mapear los campos:

```typescript
readonly DISPLAY_ORDER: Record<string, number> = {
  val_fecha_programacion: 1,
  val_num_ocupantes:      2,
  val_destino_direccion:  3,
  val_hora_salida:        4,
  val_hora_retorno:       5,
  val_vehiculo_id:        6,   // la API lo devuelve en orden 7
  val_funcionario_id:     7,   // la API lo devuelve en orden 6
  val_descripcion_actividad: 8,
  val_observaciones:      9,
};

// En cargarFormularioDinamico(), después del .map():
this.fields = formulario.preguntas
  .filter(p => p.estado !== false)
  .map(p => this.toFieldConfig(p))
  .sort((a, b) => (this.DISPLAY_ORDER[a.key] ?? 99) - (this.DISPLAY_ORDER[b.key] ?? 99));
```

### 12.2 Campos que ocupan varias columnas (`FIELD_SPAN`)

Declara un mapa de spans y un método helper. Los campos no listados tienen span 1 por defecto:

```typescript
readonly FIELD_SPAN: Record<string, number> = {
  val_funcionario_id: 2,
  val_observaciones:  2,
};

getFieldSpanClass(key: string): string {
  const span = this.FIELD_SPAN[key] ?? 1;
  if (span === 2) return 'sm:col-span-2 md:col-span-2';
  return '';
}
```

### 12.3 Grid unificado en la plantilla

En lugar de dividir `regularFields` / `textareaFields` en dos bloques, usa un único loop sobre `visibleFields` con CSS Grid. Los textareas se renderizan en su posición natural del grid, con el span que les corresponda:

```html
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
  @for (field of visibleFields; track field.id) {
    <div class="flex flex-col" [ngClass]="getFieldSpanClass(field.key)">
      <label [class.text-red-600]="esCampoInvalido(field.key)">
        {{ field.label }}
        @if (field.required) { <span class="text-red-500">*</span> }
      </label>

      @if (field.controlType === 'employee-list') {
        <select [formControlName]="field.key"> ... </select>
      } @else if (field.controlType === 'select') {
        <select [formControlName]="field.key"> ... </select>
      } @else if (field.controlType === 'textarea') {
        <textarea [formControlName]="field.key" rows="3"
                  [maxlength]="field.maxLength ?? 9999"></textarea>
      } @else {
        <input [formControlName]="field.key" [type]="getInputType(field)" />
      }
    </div>
  }
</div>
```

> Usa este patrón cuando necesites mezclar inputs y textareas en la misma cuadrícula posicional. Si todos los textareas van al final (ancho completo), el patrón `regularFields` / `textareaFields` separados sigue siendo válido y más simple.

### 12.4 Override de `controlType` en `resolveControlType`

Cuando la API marca un campo como `is_text_area: true` pero el layout lo necesita como input compacto (por ejemplo, en una columna estrecha), excluye ese campo explícitamente:

```typescript
private resolveControlType(pregunta: Pregunta): FieldConfig['controlType'] {
  if (pregunta.is_list_empleado) return 'employee-list';
  if (pregunta.tipo_respuesta === 'Selección Simple') return 'select';
  // Forzar textarea solo para campos específicos, ignorando is_text_area en el resto
  if (pregunta.nombre === 'val_observaciones') return 'textarea';
  if (pregunta.is_text_area && pregunta.nombre !== 'val_descripcion_actividad') return 'textarea';
  return 'text';
}
```

> Documenta siempre el motivo del override con un comentario en el código o en el PR. El campo sigue recibiendo `maxLength` desde `num_caracter`, por lo que la validación de longitud no se pierde.

---

## 13. Ejemplo 1 — Formulario Simple (ID: 1002, Gestión de Vehículos)

**9 campos · Sin dependencias · Sin integraciones**

```typescript
// horarios-laborales.ts
private cargarFormularioDinamico(): void {
  this.solicitudService
    .getFormulario('1002')
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (formulario) => {
        this.formulario = formulario;
        this.fields = formulario.preguntas
          .filter(p => p.estado !== false)
          .map(p => this.toFieldConfig(p))
          .sort((a, b) => (this.DISPLAY_ORDER[a.key] ?? 99) - (this.DISPLAY_ORDER[b.key] ?? 99));
        this.generateControls();
        this.applyDependencyLogic();
        this.loading = false;
      },
    });
}
```

El template usa el patrón de grid unificado (sección 12.3). Resultado: 9 campos con orden visual controlado, campos span-2 (`val_funcionario_id`, `val_observaciones`) y hora inputs (`val_hora_salida`, `val_hora_retorno`) renderizados como `type="time"`.

---

## 14. Ejemplo 2 — Formulario Complejo (ID: 380, Solicitud de Trabajo)

**18 campos · Dependencias encadenadas · Integraciones SRI/Civil · Secciones**

Campos con dependencias:
- `val_ced_op` visible solo cuando `val_ct_tipo = "Cédula"`
- `val_ruc_op` visible solo cuando `val_ct_tipo = "RUC"`
- `val_pasaporte` visible solo cuando `val_ct_tipo = "Pasaporte"`

```typescript
// Flujo de dependencia al cambiar val_ct_tipo
form.valueChanges → updateDependentFields()
  → syncFieldState(val_ced_op,    hide = valor !== "Cédula")
  → syncFieldState(val_ruc_op,    hide = valor !== "RUC")
  → syncFieldState(val_pasaporte, hide = valor !== "Pasaporte")
```

Los campos ocultos se deshabilitan y resetean automáticamente; el backend nunca recibe su valor.

Para formularios con múltiples secciones, `toFieldConfig` asigna un `section` a cada campo y `getSectionFields(sectionId)` filtra:

```typescript
getSectionFields(section: FieldSectionId): FieldConfig[] {
  return this.fields.filter(f => !f.hidden && f.section === section);
}
```

---

## 15. Diagrama de Flujo

```
API /formulario-dinamico/:id
        │
        ▼
  preguntas[ ]
  .filter(estado !== false)
  .sort(orden)
  .map(toFieldConfig)
        │
        ▼
  fields: FieldConfig[]
        │
        ├── generateControls()    → FormGroup con un AbstractControl por campo
        │
        └── applyDependencyLogic()
                │
                ├── updateDependentFields()   (inicial)
                └── form.valueChanges         (reactivo)
                        └── syncFieldState(field, hidden)
                              ├── field.hidden = hidden
                              ├── control.disable / enable
                              └── control.setValidators
                                       │
                                       ▼
                              template: @for (field of visibleFields)
```
