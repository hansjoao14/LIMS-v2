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

```typescript
esCampoInvalido(key: string): boolean {
  const c = this.form.get(key);
  return !!c && c.invalid && (c.touched || c.dirty);
}
```

Clases CSS por estado:

```html
[class.border-red-500]="esCampoInvalido(field.key)"
[class.bg-red-50]="esCampoInvalido(field.key)"
```

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

## 12. Ejemplo 1 — Formulario Simple (ID: 1002, Gestión de Vehículos)

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
          .map(p => this.toFieldConfig(p));
        this.generateControls();
        this.applyDependencyLogic();
        this.loading = false;
      },
    });
}
```

El template itera `visibleFields` con el patrón base del punto 7. Resultado: un formulario de 9 campos (fecha, número, texto, selects) generado 100% desde la API.

---

## 13. Ejemplo 2 — Formulario Complejo (ID: 380, Solicitud de Trabajo)

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

## 14. Diagrama de Flujo

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
