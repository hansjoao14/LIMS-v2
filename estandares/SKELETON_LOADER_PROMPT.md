# Estándar: Tablas con Skeleton Loader y Columna de Acciones

## Skeleton loader

En lugar de mostrar un spinner mientras carga, se muestra la tabla completa con sus cabeceras visibles y filas de barras grises pulsantes en el tbody. Cuando llega la data real, las filas del skeleton se reemplazan con los datos.

### Estructura base

El `<table>` siempre está visible con `<colgroup>` y `<thead>` estáticos. Dentro del `<tbody>` se usa `@if (loading)` para mostrar el skeleton y `@else` para mostrar la data real.

```html
<div class="border border-slate-200 rounded">
  <table class="w-full text-sm border-collapse table-fixed">
    <colgroup>
      <!-- mismas columnas que la tabla real -->
    </colgroup>
    <thead>
      <!-- mismo thead que la tabla real -->
    </thead>
    <tbody>
      @if (loading) {
        @for (_ of [1,2,3,4,5,6,7,8]; track $index) {
          <tr class="border-b border-slate-200 animate-pulse">
            <td class="px-3 py-3 border-r border-slate-100">
              <div class="h-3 bg-slate-200 rounded w-3/4"></div>
            </td>
            <td class="px-3 py-3 border-r border-slate-100">
              <div class="h-3 bg-slate-200 rounded w-4/5"></div>
            </td>
            <!-- badge (estado, prioridad) -->
            <td class="px-3 py-3 border-r border-slate-100">
              <div class="h-5 bg-slate-200 rounded w-4/5 mx-auto"></div>
            </td>
            <!-- acciones -->
            <td class="px-2 py-3">
              <div class="flex items-center justify-center gap-1.5">
                <div class="h-8 w-8 bg-slate-200 rounded"></div>
                <div class="h-8 w-8 bg-slate-200 rounded"></div>
              </div>
            </td>
          </tr>
        }
      } @else {
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
```

### Reglas de las barras según tipo de columna

| Tipo de columna | Clases de la barra |
|---|---|
| Texto (ID, nombre, solicitante) | `h-3 bg-slate-200 rounded w-3/4` |
| Texto centrado (periodo, fecha) | `h-3 bg-slate-200 rounded w-3/4 mx-auto` |
| Badge (estado, prioridad) | `h-5 bg-slate-200 rounded w-4/5 mx-auto` |
| Botones de acción | `flex gap-1.5` con `div` de `h-8 w-8 bg-slate-200 rounded` por botón |

### Reglas de implementación

1. Reemplaza el `@if (loading) { spinner } @else { tabla }` actual por la estructura de arriba.
2. Mantén el `<colgroup>` y `<thead>` fuera del `@if`/`@else`, siempre visibles.
3. En el skeleton usa `@for (_ of [1,2,3,4,5,6,7,8]; track $index)` para generar 8 filas fantasma.
4. Ajusta el número de `<td>` del skeleton para que coincida exactamente con las columnas del `<thead>`.
5. No cambies la lógica del componente `.ts` — solo el template `.html`.

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
- **Menú contextual (⋮)** — desplegable posicionado con `fixed`. Se usa para acciones secundarias: Editar, Eliminar, Imprimir.

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

    <!-- Botón de menú contextual (⋮) -->
    @if (canEdit() || canDelete()) {
      <button type="button" title="Más acciones"
        (click)="toggleMenu(item.id, $event)"
        class="h-8 w-8 flex items-center justify-center rounded border border-slate-300 text-slate-500 bg-white hover:bg-slate-100 transition-colors shrink-0">
        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
        </svg>
      </button>
    }

  </div>
</td>
```

### HTML del menú contextual (fuera de la tabla, al final del template)

Se posiciona con `fixed` usando coordenadas calculadas en el `.ts` al hacer click. Un overlay invisible cierra el menú al hacer click fuera.

```html
@if (openMenuId !== null) {
  <!-- Overlay para cerrar al hacer click fuera -->
  <div class="fixed inset-0 z-40" (click)="closeMenu()"></div>

  <!-- Menú posicionado -->
  <div class="fixed z-50 bg-white border border-slate-200 rounded-lg shadow-lg py-1 w-40"
       [style.top.px]="menuTop"
       [style.left.px]="menuLeft">

    @for (item of items; track item.id) {
      @if (item.id === openMenuId) {

        <!-- Opción: Editar -->
        @if (canEdit()) {
          <button type="button" (click)="cargarParaEditar(item); closeMenu()"
            [disabled]="saving"
            class="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-amber-700 hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed">
            <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Editar
          </button>
        }

        <!-- Opción: Eliminar -->
        @if (canDelete()) {
          <button type="button" (click)="eliminarRegistro(item); closeMenu()"
            [disabled]="saving"
            class="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed">
            <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Eliminar
          </button>
        }

        <!-- Opción: Imprimir (separada con borde) — solo cuando aplica por estado -->
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
    }
  </div>
}
```

### Lógica del menú en el `.ts`

```typescript
openMenuId: string | null = null;
menuTop = 0;
menuLeft = 0;

toggleMenu(id: string, event: MouseEvent): void {
  if (this.openMenuId === id) {
    this.openMenuId = null;
    return;
  }
  const btn = event.currentTarget as HTMLElement;
  const rect = btn.getBoundingClientRect();
  this.menuTop  = rect.bottom + 4;
  this.menuLeft = rect.left - 120;  // ajustar según ancho del menú (w-40 = 160px)
  this.openMenuId = id;
}

closeMenu(): void {
  this.openMenuId = null;
}
```

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
- El menú contextual siempre va **al final del template**, fuera de la tabla.
- El overlay `fixed inset-0 z-40` cierra el menú al hacer click fuera.
- El menú tiene `z-50` (mayor que el overlay).
- Imprimir y otras acciones condicionales por estado van separadas con `border-t border-slate-100 mt-1 pt-1`.
- Si la columna de acciones no aplica (`!hasAnyAction`), no se agrega ni el `<col>` ni el `<th>`.
