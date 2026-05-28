# Estándar: Split Lista + Formulario

## Objetivo
Dividir un componente monolítico en tres piezas:
- `lista/` — tabla, paginación, acciones, PDF, permisos de lectura/acción
- `formulario/` — carga dinámica del schema, form reactivo, guardar/actualizar
- padre — coordinador mínimo (editingRecord, @ViewChild, título)

## Prompt reutilizable

```
Refactoriza `src/app/features/<NOMBRE>/` siguiendo el patrón lista/formulario:

**Archivos a crear:**
- `<NOMBRE>/formulario/<NOMBRE>-formulario.ts` + `.html`
- `<NOMBRE>/lista/<NOMBRE>-lista.ts` + `.html`

**Archivos a modificar:**
- `<NOMBRE>/<NOMBRE>.ts` → padre simplificado
- `<NOMBRE>/<NOMBRE>.html` → solo monta los dos sub-componentes

---

### Reglas del FORMULARIO

El componente formulario:
- Siempre se monta (para emitir `formularioReady` aunque el usuario no tenga permiso de crear)
- Controla su propia visibilidad interna: `@if (canCreate() || editingRecord)`
- `@Input() editingRecord: VehiculoRecord | null` — cuando llega, parchea el form vía `ngOnChanges`
- `@Output() guardado` — emite tras guardar/actualizar exitosamente (NO llama cargarDatos)
- `@Output() cancelado` — emite al cancelar edición
- `@Output() formularioReady` — emite `{ nombre, fields, formularioId }` tras cargar el schema
- Maneja internamente: carga del schema dinámico, validadores, guardar, actualizar

### Reglas de la LISTA

El componente lista:
- `@Input() formularioId: number | null` — arranca `cargarDatos()` en `ngOnChanges` cuando llega
- `@Input() fields: FieldConfig[]` — para resolver nombres de empleados
- `@Input() editingRecordId: string | null` — resalta la fila en edición (`[class.bg-amber-50]`)
- `@Output() editar` — emite el `VehiculoRecord` al hacer clic en Editar del menú contextual
- `cargarDatos()` es PUBLIC — el padre lo llama vía `@ViewChild` tras un guardado
- Maneja internamente: autorizar, rechazar, eliminar, imprimir, PDF viewer, permisos

### Reglas del PADRE

```typescript
@ViewChild(NombreLista) listaRef!: NombreLista;
editingRecord: VehiculoRecord | null = null;
formularioNombre = 'Título por defecto';
fields: FieldConfig[] = [];
formularioId: number | null = null;
canCreate = computed(...)  // solo si el padre necesita mostrarlo en el header

onFormularioReady(e): void  // guarda nombre, fields, formularioId
onEditar(record): void      // asigna editingRecord + scrollTo top
onGuardado(): void          // limpia editingRecord + llama listaRef.cargarDatos()
onCancelado(): void         // limpia editingRecord
```

HTML padre:
```html
<app-page-header [title]="formularioNombre" ... />
<app-<nombre>-formulario
  [editingRecord]="editingRecord"
  (formularioReady)="onFormularioReady($event)"
  (guardado)="onGuardado()"
  (cancelado)="onCancelado()"
/>
<app-<nombre>-lista
  [formularioId]="formularioId"
  [fields]="fields"
  [editingRecordId]="editingRecord?.id ?? null"
  (editar)="onEditar($event)"
/>
```

---

### Restricciones
- NO mover el CSS del padre
- NO cambiar selectores ni rutas de routing
- NO duplicar llamadas al API (el formulario emite los fields; la lista los recibe)
- El tipo `VehiculoRecord = { id: string } & Record<string, unknown>` se define en cada archivo
- `standalone: true` solo en el padre si ya lo tenía; los hijos no lo declaran explícitamente
```

## Módulos ya migrados
| Módulo | Fecha | Notas |
|--------|-------|-------|
| `horarios-laborales` | 2026-05-28 | Referencia principal del patrón |
