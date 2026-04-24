# Cómo el Step 2 sabe qué campos llenar al editar una solicitud

## Flujo general

```
Lista de solicitudes
  → usuario pulsa "Editar"
  → navega a /solicitud-trabajo/:id con history.state.solicitud
  → ngOnInit detecta modoEdicion = true
  → cargarFormularioDinamico() carga la definición del formulario
  → (callback) preCargarValoresEdicion(solicitudId) carga los valores guardados
```

---

## 1. ¿De dónde vienen los campos del formulario?

El componente llama a `SolicitudService.getFormulario(idTipoFormulario)`.  
La respuesta incluye un array `preguntas`, cada una con:

| Campo en `Pregunta`   | Para qué sirve |
|-----------------------|----------------|
| `nombre`              | Nombre del control en el `FormGroup` (ej. `val_ct_tipo`) |
| `tipo_respuesta`      | Tipo de input: `Selección Simple`, `Selección Mutiple`, `Texto`, etc. |
| `hidden`              | Si arranca oculto (deshabilitado) |
| `atributo_id`         | ID del campo padre del que depende (puede ser `null`) |
| `item_catalogo_id`    | Valor del padre que activa la visibilidad de este campo |
| `jornada_laboral_item`| Ítems disponibles para campos de tipo schedule (horarios) |
| `catalogos`           | Opciones disponibles para campos de tipo select |

`toFieldConfig()` convierte cada `Pregunta` en un `FieldConfig` con:
```ts
dependsOn: pregunta.atributo_id
  ? { fieldId: String(pregunta.atributo_id), triggerValue: String(pregunta.item_catalogo_id) }
  : undefined
```

---

## 2. Lógica de dependencias (campos ocultos / visibles)

`applyDependencyLogic()` se suscribe a `form.valueChanges` y en cada cambio llama a `updateDependentFields()`.

Para cada campo que tiene `dependsOn`:
- Busca el campo padre por `fieldId`
- Lee el valor actual del padre (`parentValue`)
- Si `String(parentValue) !== triggerValue` → el campo se **oculta y deshabilita**
- Si coincide → el campo se **muestra y habilita**

**Ejemplo real** (`val_nom_op`, `val_ced_op`, `val_ape_op`, `val_dire_op`):
```
atributo_id   = "94cf9c34-..."   → padre = val_ct_tipo (Tipo de identificación)
item_catalogo_id = "97"          → triggerValue = "97" (opción Cédula)

Cuando val_ct_tipo = 97 → estos campos se habilitan
Cuando val_ct_tipo ≠ 97 → estos campos se ocultan y resetean
```

---

## 3. ¿Cómo se cargan los valores guardados? (`preCargarValoresEdicion`)

La fuente de datos es la query GraphQL `collectionReportValorSolicitud` filtrada por `id_solicitud`.  
Cada ítem de la respuesta contiene:

| Campo GraphQL              | Qué representa |
|---------------------------|----------------|
| `atributo_formulario_nombre` | Nombre del control (`val_ct_tipo`, `val_nom_op`, …) |
| `ctipo_dato_nombre`         | Tipo: `Texto`, `Selección Simple`, `Selección Mutiple` |
| `atributo_id`               | ID del campo padre (solo en campos dependientes) |
| `item_catalogo_id`          | Opción del padre que activó este campo al guardar |
| `valor_texto`               | Valor guardado para campos de texto |
| `valor_multiple`            | JSON de ítems guardados para campos de horario |

### Problema: `valor_catalogo` no está en el esquema del reporte

El valor seleccionado de un `<select>` (ej. qué opción de `val_ct_tipo` estaba activa) **no** está disponible directamente en la vista de reportes.

**Solución — inferencia inversa:**

Los campos dependientes (ej. `val_nom_op`) sí guardan:
- `atributo_id` = ID del padre (`val_ct_tipo`)
- `item_catalogo_id` = el trigger que los activó (ej. `"97"` = Cédula)
- `valor_texto` = su propio valor guardado

Si un campo dependiente tiene `atributo_id` + `item_catalogo_id` + un valor guardado, entonces su padre **estaba en** `item_catalogo_id` cuando se guardó.

```ts
// Se construye este mapa: atributo_formulario_id del padre → número de opción seleccionada
inferredSelectValues.set(v.atributo_id, Number(v.item_catalogo_id));
// Ejemplo: "94cf9c34-..." → 97
```

### Patch en dos pasos (orden obligatorio)

```
Paso 1 — patchValue(selectPatch)
  → establece val_ct_tipo = 97
  → dispara form.valueChanges
  → updateDependentFields() habilita val_nom_op, val_ced_op, val_ape_op, val_dire_op

Paso 2 — patchValue(textPatch)
  → ahora los controles están habilitados
  → se escriben los valores de texto sobre controles ya activos
```

Si se hiciera solo un patch (o el de textos primero), los controles dependientes estarían **deshabilitados** y Angular no los renderizaría con valor aunque el dato estuviera en memoria.

> **Por qué NO se usa `form.contains(key)`:**  
> `contains()` devuelve `false` para controles deshabilitados.  
> Se usa `form.get(key)` para incluir tanto controles habilitados como deshabilitados al construir los patches.

---

## 4. Restauración de horarios laborales (`Selección Mutiple`)

Los horarios se guardan en `valor_multiple` como JSON:
```json
[
  {"dia_laboral":"Lunes","hora_inicio":"08:00:00","hora_fin":"09:00:00"},
  {"dia_laboral":"Lunes","hora_inicio":"09:00:00","hora_fin":"10:00:00"}
]
```

Para restaurarlos no basta con `patchValue` porque el control de schedule no usa `FormControl`; usa `selectedScheduleIndexes: Set<number>`.

El algoritmo:
1. Parsear el JSON de `valor_multiple`
2. Por cada ítem guardado, buscar su índice en `field.scheduleItems` (los ítems disponibles que vienen del formulario) comparando `dia_laboral` + `hora_inicio` + `hora_fin`
3. Agregar ese índice a `selectedScheduleIndexes`

El template de step2 usa ese `Set` para marcar los checkboxes.

---

## 5. Resumen del flujo completo

```
API formulario-dinamico
  └─ preguntas[]:
       nombre, hidden, atributo_id, item_catalogo_id, catalogos, jornada_laboral_item
            ↓  toFieldConfig()
       FieldConfig[]: key, dependsOn, options, scheduleItems
            ↓  generateControls()
       FormGroup: un FormControl por campo (disabled si hidden=true)
            ↓  applyDependencyLogic()
       Suscripción a valueChanges → habilita/deshabilita campos según dependsOn

GraphQL collectionReportValorSolicitud (por id_solicitud)
  └─ valor[]:
       atributo_formulario_nombre → key del control
       ctipo_dato_nombre          → tipo de dato
       atributo_id + item_catalogo_id + valor_texto → inferir valor del select padre
       valor_multiple             → JSON de horarios seleccionados
            ↓  preCargarValoresEdicion()
       selectPatch  → patchValue() → habilita dependientes
       textPatch    → patchValue() → escribe valores en controles ya activos
       selectedScheduleIndexes → restaura checkboxes de horario
```
