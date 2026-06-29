# Estándar: Tablas con Skeleton Loader y Columna de Acciones

## Skeleton loader

En lugar de mostrar un spinner mientras carga, se muestra la tabla completa con sus cabeceras visibles y filas de barras grises pulsantes en el tbody. Cuando llega la data real, las filas del skeleton se reemplazan con los datos.

### Componente reutilizable `TableSkeleton`

El skeleton de tabla está encapsulado en `src/app/ui/table-skeleton/table-skeleton.ts` como componente standalone con selector `tbody[appTableSkeleton]`. Esto aplica el componente sobre un `<tbody>` existente (no agrega un elemento extra al DOM).

**Inputs:**

| Input | Tipo | Default | Descripción |
|---|---|---|---|
| `rows` | `number` | `8` | Número de filas fantasma. Pasar `0` para no mostrar nada. |
| `cols` | `number` | `4` | Columnas de datos (sin contar la columna de acciones). |
| `actionButtons` | `number` | `0` | Número de botones de acción a simular en la última columna. |

### Estructura base en el template HTML

Se usan **dos `<tbody>` hermanos** en lugar de un `@if/@else` externo. Esto es necesario porque el parser de Angular rechaza `</tbody>` dentro de un bloque `@else` cuando hay condiciones en `<colgroup>` o `<thead>`.

```html
<div class="border border-slate-200 rounded overflow-hidden">
  <div class="overflow-x-auto custom-scroll">
    <table class="w-full text-sm border-collapse table-fixed">
      <colgroup>
        <!-- mismas columnas que la tabla real -->
        @if (hasAnyAction) {
          <col class="w-[100px]">
        }
      </colgroup>
      <thead>
        <!-- mismo thead que la tabla real -->
      </thead>

      <!-- tbody 1: skeleton (rows=0 cuando no está cargando → no renderiza nada) -->
      <tbody appTableSkeleton
        [rows]="loading ? 8 : 0"
        [cols]="4"
        [actionButtons]="hasAnyAction ? 1 : 0">
      </tbody>

      <!-- tbody 2: datos reales, ocultos mientras carga -->
      <tbody>
        @if (!loading) {
          @for (item of items; track item.id) {
            <tr><!-- filas reales --></tr>
          } @empty {
            <tr>
              <td colspan="N" class="p-10 text-slate-400 italic text-center">
                No hay registros.
              </td>
            </tr>
          }
        }
      </tbody>

    </table>
  </div>
</div>
```

### Importar en el componente `.ts`

```typescript
import { TableSkeleton } from '../../../../ui/table-skeleton/table-skeleton';

@Component({
  standalone: true,
  imports: [TableSkeleton, /* ... */],
})
```

### Reglas de implementación

1. Usar siempre el componente `TableSkeleton` — no escribir `animate-pulse` inline en tablas.
2. Mantén el `<colgroup>` y `<thead>` fuera de cualquier `@if`, siempre visibles.
3. El valor de `[rows]` usa el ternario `loading ? 8 : 0`; cuando es `0` el componente no renderiza nada.
4. `[cols]` cuenta solo las columnas de datos, sin incluir la columna de acciones (que se maneja con `[actionButtons]`).
5. **No** envolver los dos `<tbody>` en un `@if (loading) { ... } @else { ... }` externo: el parser Angular rechaza `</tbody>` dentro de `@else` cuando hay `@if` en `<colgroup>` o `<thead>`.

---

## Skeleton loader para campos de formulario

Para estados de carga en selects o inputs (mientras se cargan opciones de un catálogo), usar el componente `FieldSkeleton` ubicado en `src/app/ui/field-skeleton/field-skeleton.ts`.

```html
<!-- En lugar de mostrar el select directamente mientras carga -->
@if (loadingOpciones) {
  <app-field-skeleton [height]="'h-10'" />
} @else {
  <select ...>...</select>
}
```

**Input `height`:** clase Tailwind de altura (`h-8`, `h-9`, `h-10`, `h-11`, `h-12`). Default: `h-10`.

```typescript
import { FieldSkeleton } from '../../../../ui/field-skeleton/field-skeleton';

@Component({
  standalone: true,
  imports: [FieldSkeleton, /* ... */],
})
```

### Verificación importante en el servicio

Si el loader no aparece y muestra vacío inmediatamente, revisar el servicio GraphQL. Si usa `watchQuery` + `valueChanges`, cambiarlo a `query` (single-shot):

```typescript
// ❌ Mal — emite un evento de carga con data:null antes de la respuesta real
this.apollo.use(CLIENT).watchQuery({ ... }).valueChanges.pipe(map(...))

// ✅ Bien — solo emite cuando llega la respuesta de red
this.apollo.use(CLIENT).query({ ... }).pipe(map(...))
```

---

## Columna de acciones

### Cuándo incluirla

La columna de acciones solo se agrega cuando el usuario tiene permisos para realizar alguna acción (editar, eliminar, autorizar, rechazar, imprimir). Se controla con un flag `hasAnyAction` evaluado en el `.ts`.

```typescript
get hasAnyAction(): boolean {
  return this.canEdit() || this.canDelete() || this.canAutorizar() || this.canRechazar();
}
```

El `<colgroup>` y el `<thead>` condicionan esa columna con `@if (hasAnyAction)`.

### Botones directos vs menú contextual

Hay dos tipos de acciones:

- **Botones directos** — visibles siempre en la fila. Se usan para acciones primarias como Autorizar y Rechazar.
- **Menú contextual (⋮)** — desplegable posicionado con `absolute` relativo al botón. Se usa para acciones secundarias: Editar, Eliminar, Imprimir.

Ambos conviven en la misma celda `<td class="px-2 py-2.5 text-center">`.

### HTML de la celda de acciones

```html
<td class="px-2 py-2.5 text-center">
  <div class="flex items-center justify-center gap-1.5">

    <!-- Botón directo: Autorizar -->
    @if (canAutorizar()) {
      <button type="button" title="Autorizar"
        (click)="autorizarRegistro(item)"
        [disabled]="procesandoId === item.id"
        class="h-8 w-8 flex items-center justify-center rounded border border-green-400 text-green-700 bg-green-50 hover:bg-green-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0">
        <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    }

    <!-- Botón directo: Rechazar -->
    @if (canRechazar()) {
      <button type="button" title="Rechazar"
        (click)="rechazarRegistro(item)"
        [disabled]="procesandoId === item.id"
        class="h-8 w-8 flex items-center justify-center rounded border border-red-300 text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0">
        <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    }

    <!-- Botón de menú contextual (⋮) + menú inline -->
    @if (canEdit() || canDelete()) {
      <div class="relative">
        <button type="button" title="Más acciones"
          (click)="toggleMenu(item.id, $event)"
          class="h-8 w-8 flex items-center justify-center rounded border border-slate-300 text-slate-500 bg-white hover:bg-slate-100 transition-colors shrink-0">
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
          </svg>
        </button>
        @if (openMenuId === item.id) {
          <div class="absolute right-0 top-full mt-1 z-50 bg-white border border-slate-200 rounded-lg shadow-lg py-1 w-40">
            <!-- ítems del menú (ver sección HTML del menú contextual) -->
          </div>
        }
      </div>
    }

  </div>
</td>
```

### HTML del menú contextual (ítems — dentro del `<div class="relative">`)

El menú va **dentro del `@for` de filas**, en un `<div class="relative">` que envuelve el botón de los 3 puntos. Esto garantiza que siempre aparezca junto al botón sin importar si hay transforms CSS en los ancestros (`animate-in`, etc.).

```html
<!-- Dentro del @for, en la celda de acciones -->
<div class="relative">
  <button type="button" title="Más acciones"
    (click)="toggleMenu(item.id, $event)"
    class="h-8 w-8 flex items-center justify-center rounded border border-slate-300 text-slate-500 bg-white hover:bg-slate-100 transition-colors shrink-0">
    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
    </svg>
  </button>
  @if (openMenuId === item.id) {
    <div class="absolute right-0 top-full mt-1 z-50 bg-white border border-slate-200 rounded-lg shadow-lg py-1 w-40">

      <!-- Opción: Editar -->
      @if (canEdit()) {
        <button type="button" (click)="editar.emit(item); closeMenu()"
          class="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-amber-700 hover:bg-amber-50">
          <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Editar
        </button>
      }

      <!-- Opción: Eliminar -->
      @if (canDelete()) {
        <button type="button" (click)="eliminarRegistro(item); closeMenu()"
          class="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50">
          <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Eliminar
        </button>
      }

      <!-- Opción: Imprimir (solo cuando aplica por estado, separada con borde) -->
      @if ($any(item['ctestado_id']) === 387) {
        <div class="border-t border-slate-100 mt-1 pt-1">
          <button type="button" (click)="imprimirRegistro(item); closeMenu()"
            class="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50">
            <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimir
          </button>
        </div>
      }

    </div>
  }
</div>
```

Al final del template (fuera de la tabla), solo el overlay de cierre:

```html
@if (openMenuId !== null) {
  <div class="fixed inset-0 z-40" (click)="closeMenu()"></div>
}
```

### Lógica del menú en el `.ts`

**NO usar `position: fixed` con coordenadas calculadas.** Los ancestros con `animate-in` crean un nuevo containing block que desplaza las coordenadas del viewport.

```typescript
openMenuId: string | null = null;

toggleMenu(id: string, event: MouseEvent): void {
  event.stopPropagation();
  this.openMenuId = this.openMenuId === id ? null : id;
}

closeMenu(): void {
  this.openMenuId = null;
}
```

---

## Autorizar / Rechazar

### Patrón estándar (TypeScript)

Usa Swal.fire para confirmación, `procesandoId` para deshabilitar el botón durante la petición, y `actualizarSolicitud` para cambiar el estado. La referencia a `ReportSolicitud` se guarda en `record['_solicitud']` al cargar los datos.

```typescript
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';

// Constantes de estado (arriba del @Component)
const ESTADO_AUTORIZADO = 387;
const ESTADO_RECHAZADO  = 51;

// En la clase
procesandoId: string | null = null;

async autorizarRegistro(record: VehiculoRecord): Promise<void> {
  const sol = record['_solicitud'] as ReportSolicitud | undefined;
  if (!sol) return;
  const confirm = await Swal.fire({
    icon: 'question',
    title: '¿Autorizar solicitud?',
    text: 'Se aprobará la solicitud seleccionada.',
    showCancelButton: true,
    confirmButtonColor: '#16a34a',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Sí, autorizar',
    cancelButtonText: 'Cancelar',
  });
  if (!confirm.isConfirmed) return;
  this.procesandoId = record.id;
  this.solicitudService
    .actualizarSolicitud(sol.id_solicitud, {
      ctestado_id:    ESTADO_AUTORIZADO, formulario_id:  sol.formulario_id,
      usuario_id:     sol.usuario_id,    entidad_id:     sol.establecimiento_id,
      secuencial_id:  sol.secuencial_id, periodo_id:     sol.periodo_id,
      descripcion:    sol.descripcion_solicitud, estado: sol.estado_logico_solicitud,
      num_secuencial: sol.num_secuencial,
    })
    .pipe(takeUntil(this.destroy$), finalize(() => { this.procesandoId = null; }))
    .subscribe({
      next:  () => this.zone.run(() => {
        this.toastrAlert.showSuccess('Autorizado correctamente.', '¡Autorizado!');
        this.cargarDatos();
      }),
      error: () => this.zone.run(() =>
        this.toastrAlert.showError('No se pudo autorizar el registro.', 'Error')
      ),
    });
}

async rechazarRegistro(record: VehiculoRecord): Promise<void> {
  const sol = record['_solicitud'] as ReportSolicitud | undefined;
  if (!sol) return;
  const { isConfirmed } = await Swal.fire({
    icon: 'warning',
    title: 'Rechazar solicitud',
    text: `Se rechazará la solicitud ${sol.num_secuencial ?? sol.id_solicitud}.`,
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Sí, rechazar',
    cancelButtonText: 'Cancelar',
  });
  if (!isConfirmed) return;
  this.procesandoId = record.id;
  this.solicitudService
    .actualizarSolicitud(sol.id_solicitud, {
      ctestado_id:    ESTADO_RECHAZADO, formulario_id:  sol.formulario_id,
      usuario_id:     sol.usuario_id,   entidad_id:     sol.establecimiento_id,
      secuencial_id:  sol.secuencial_id, periodo_id:    sol.periodo_id,
      descripcion:    sol.descripcion_solicitud, estado: sol.estado_logico_solicitud,
      num_secuencial: sol.num_secuencial,
    })
    .pipe(takeUntil(this.destroy$), finalize(() => { this.procesandoId = null; }))
    .subscribe({
      next:  () => this.zone.run(() => {
        this.toastrAlert.showWarning('Solicitud rechazada.', 'Rechazado');
        this.cargarDatos();
      }),
      error: () => this.zone.run(() =>
        this.toastrAlert.showError('No se pudo rechazar el registro.', 'Error')
      ),
    });
}
```

### Cómo adjuntar `_solicitud` al record al cargar datos

```typescript
// En cargarDatos(), después de obtener valores y solicitudes con forkJoin:
const estadoMap = new Map(solicitudes.map(s => [s.id_solicitud, s]));
for (const r of records) {
  const s = estadoMap.get(r.id);
  if (s) {
    r['ctestado_id']      = s.ctestado_id;
    r['estado_solicitud'] = s.estado_solicitud;
    r['_solicitud']       = s;   // ← referencia completa para autorizar/rechazar
  }
}
```

### Swal config por acción

| Acción | `icon` | `confirmButtonColor` | `confirmButtonText` |
|---|---|---|---|
| Autorizar | `'question'` | `'#16a34a'` (verde) | `'Sí, autorizar'` |
| Rechazar | `'warning'` | `'#d33'` (rojo) | `'Sí, rechazar'` |
| Eliminar | `'warning'` | `'#d33'` (rojo) | `'Sí, eliminar'` |

`cancelButtonColor` siempre `'#6b7280'` (slate).

### Colores por tipo de acción

| Acción | Color del botón | Color en el menú |
|---|---|---|
| Autorizar | `border-green-400 text-green-700 bg-green-50 hover:bg-green-100` | — |
| Rechazar | `border-red-300 text-red-600 bg-red-50 hover:bg-red-100` | — |
| Más acciones (⋮) | `border-slate-300 text-slate-500 bg-white hover:bg-slate-100` | — |
| Editar | — | `text-amber-700 hover:bg-amber-50` |
| Eliminar | — | `text-red-600 hover:bg-red-50` |
| Imprimir | — | `text-slate-600 hover:bg-slate-50` (separado con `border-t`) |

### Resumen de reglas

- Todos los botones son `h-8 w-8`, con `shrink-0` para que no se compriman.
- El contenedor siempre es `flex items-center justify-center gap-1.5`.
- El menú contextual va **dentro del `@for` de filas**, en un `<div class="relative">` alrededor del botón de los 3 puntos. **No usar `position: fixed` con coordenadas**.
- El overlay `fixed inset-0 z-40` va al final del template (fuera de la tabla) y cierra el menú al hacer click fuera.
- El menú tiene `z-50` (mayor que el overlay).
- Imprimir y otras acciones condicionales por estado van separadas con `border-t border-slate-100 mt-1 pt-1`.
- Si la columna de acciones no aplica (`!hasAnyAction`), no se agrega ni el `<col>` ni el `<th>`.
- Autorizar/Rechazar siempre usan `Swal.fire` + `procesandoId` + `[disabled]="procesandoId === item.id"` en el botón.
