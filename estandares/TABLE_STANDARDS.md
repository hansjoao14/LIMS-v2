# Estándares de Tabla — LIMS

Referencias canónicas:
- `src/app/features/lista-solicitudes/lista-solicitudes.html`
- `src/app/features/lista-cotizaciones/lista-cotizaciones.html`

---

## Estructura de página completa

```html
<!-- Página standalone (con router) -->
<div class="p-6 bg-slate-50 min-h-screen text-slate-800 font-sans pb-20">
  <div class="max-w-7xl mx-auto bg-white p-8 rounded shadow-sm border border-slate-200 min-h-[70vh]">

    <div class="animate-in fade-in">

      <!-- Cabecera de página -->
      <div class="mb-8">
        <p class="text-sm font-medium text-slate-500 mb-1">
          Sistema LIMS / <span class="font-bold text-[#1d2b64]">Nombre de sección</span>
        </p>
        <h2 class="text-2xl font-bold text-[#1d2b64]">Título de la página</h2>
        <p class="text-sm text-slate-600 mt-1">Descripción breve del listado.</p>
      </div>

      <!-- Tabla -->
      <!-- Paginación -->

    </div>
  </div>
</div>

<!-- Bloque de estilos al final del archivo -->
<style>
  .animate-in { animation: animateIn 0.3s ease-out forwards; }
  .fade-in { opacity: 0; }
  @keyframes animateIn { to { opacity: 1; transform: translate(0); } }
</style>
```

> Para componentes embebidos dentro de otro (sin router propio), omitir el wrapper exterior y usar directamente:
> ```html
> <div class="bg-white p-8 rounded shadow-sm border border-slate-200 min-h-[70vh] animate-in fade-in">
> ```

---

## Estructura de tabla completa

El estado de loading se renderiza como **skeleton rows dentro del `<tbody>`**, no como un spinner externo.
La tabla siempre está presente en el DOM; solo cambia su contenido.

```html
<div class="border border-slate-200 rounded">
  <table class="w-full text-sm border-collapse table-fixed">

    <!-- colgroup: anchos explícitos para todas las columnas -->
    <colgroup>
      <col class="w-[150px]">
      <col class="w-[140px]">
      <col>                    <!-- columna flexible (sin ancho fijo) -->
      <col class="w-[90px]">
      <col class="w-[105px]">
      <col class="w-[120px]"> <!-- acciones: última columna -->
    </colgroup>

    <thead>
      <tr class="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200 tracking-wider">
        <th class="px-3 py-2.5 border-r border-slate-100 text-left">Col. izquierda</th>
        <th class="px-3 py-2.5 border-r border-slate-100 text-center">Col. centrada</th>
        <!-- última columna: sin border-r -->
        <th class="px-2 py-2.5 text-center">Acciones</th>
      </tr>
    </thead>

    <tbody>
      <!-- Estado loading: skeleton rows -->
      @if (loading) {
        @for (_ of [1,2,3,4,5,6,7,8]; track $index) {
          <tr class="border-b border-slate-200 animate-pulse">
            <td class="px-3 py-3 border-r border-slate-100">
              <div class="h-3 bg-slate-200 rounded w-3/4"></div>
            </td>
            <td class="px-3 py-3 border-r border-slate-100">
              <div class="h-3 bg-slate-200 rounded w-4/5"></div>
            </td>
            <!-- columna centrada: agregar mx-auto al div interno -->
            <td class="px-3 py-3 border-r border-slate-100">
              <div class="h-3 bg-slate-200 rounded w-1/2 mx-auto"></div>
            </td>
            <!-- columna de acciones -->
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
          <tr class="border-b border-slate-200 hover:bg-slate-50 transition-colors">
            <td class="px-3 py-2.5 border-r border-slate-100 text-left">...</td>
            <td class="px-3 py-2.5 border-r border-slate-100 text-center">...</td>
            <!-- última columna: sin border-r -->
            <td class="px-2 py-2.5 text-center">...</td>
          </tr>
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

<!-- Paginación: hermana del div de tabla, nunca hija -->
<app-pagination
  [meta]="meta"
  [currentPage]="currentPage"
  [itemsShown]="items.length"
  itemLabel="registros"
  (pageChange)="cargarPagina($event)">
</app-pagination>
```

---

## Clases por elemento

| Elemento | Clases |
|---|---|
| Wrapper tabla | `border border-slate-200 rounded overflow-x-auto` |
| `<table>` | `w-full text-sm border-collapse table-fixed min-w-[Npx]` (ajustar N según columnas) |
| `<thead> <tr>` | `bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200 tracking-wider` |
| `<th>` izquierda | `px-3 py-2.5 border-r border-slate-100 text-left` |
| `<th>` centrado | `px-3 py-2.5 border-r border-slate-100 text-center` |
| `<th>` última col | `px-2 py-2.5 text-center` |
| `<tbody>` | *(sin clases — los bordes van en `<tr>`)* |
| `<tr>` datos | `border-b border-slate-200 hover:bg-slate-50 transition-colors` |
| `<tr>` skeleton | `border-b border-slate-200 animate-pulse` |
| `<td>` normal | `px-3 py-2.5 border-r border-slate-100` |
| `<td>` centrado | `px-3 py-2.5 border-r border-slate-100 text-center` |
| `<td>` última col | `px-2 py-2.5 text-center` |
| Fila vacía | `p-10 text-slate-400 italic text-center` |
| Skeleton div texto | `h-3 bg-slate-200 rounded w-3/4` (variantes: `w-4/5`, `w-2/3`, `w-1/2 mx-auto`) |
| Skeleton div badge | `h-5 bg-slate-200 rounded w-4/5 mx-auto` |
| Skeleton div botón | `h-8 w-8 bg-slate-200 rounded` |

---

## Tipos de celda de datos

### Texto principal (identificador / secuencial)
```html
<td class="px-3 py-2.5 border-r border-slate-100 font-bold text-[#1d2b64] break-words"
    [title]="item.campo ?? '—'">
  {{ item.campo ?? '—' }}
</td>
```

### Texto largo truncado
```html
<td class="px-3 py-2.5 border-r border-slate-100 text-slate-600 truncate"
    [title]="item.campo">
  {{ item.campo }}
</td>
```

### Fecha
```html
<td class="px-3 py-2.5 border-r border-slate-100 text-center text-slate-500 whitespace-nowrap text-xs">
  {{ item.fecha_creacion | date:'dd/MM/yyyy' }}
</td>
```

### Texto centrado corto (periodo, código)
```html
<td class="px-3 py-2.5 border-r border-slate-100 text-center text-slate-500 truncate"
    [title]="item.campo">
  {{ item.campo }}
</td>
```

---

## Badges de estado

```html
<!-- Activo / Verde -->
<span class="block w-full text-center py-0.5 border border-green-400 text-green-700 font-bold text-[10px] rounded bg-green-50">
  Autorizado
</span>

<!-- Pendiente / Amarillo -->
<span class="block w-full text-center py-0.5 border border-amber-400 text-amber-700 font-bold text-[10px] rounded bg-amber-50">
  Pendiente
</span>

<!-- Informativo / Azul -->
<span class="block w-full text-center py-0.5 border border-blue-400 text-blue-700 font-bold text-[10px] rounded bg-blue-50">
  Creado
</span>

<!-- Rechazo / Rojo -->
<span class="block w-full text-center py-0.5 border border-red-400 text-red-700 font-bold text-[10px] rounded bg-red-50">
  Rechazado
</span>

<!-- Inactivo / Gris -->
<span class="block w-full text-center py-0.5 border border-slate-300 text-slate-500 font-bold text-[10px] rounded bg-slate-50">
  {{ item.estado }}
</span>

<!-- Prioridad / Naranja -->
<span class="block w-full text-center py-0.5 border border-orange-400 text-orange-700 font-bold text-[10px] rounded bg-orange-50">
  Alta
</span>
```

> Usar `block w-full` dentro de `<td>` para que el badge ocupe el ancho de la celda.
> Para badges inline fuera de tabla usar `inline-block` en lugar de `block w-full`.

---

## Botones de acción en tabla

Todos los botones de acción son cuadrados `h-8 w-8` con ícono SVG `h-3.5 w-3.5`.
Cuando hay operación en curso, el ícono se reemplaza por un spinner del mismo color.

```html
<!-- Botón Editar — Ámbar -->
<button (click)="editarItem(item)"
        [disabled]="procesandoId === item.id"
        title="Editar"
        class="h-8 w-8 flex items-center justify-center rounded border border-amber-400 text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shrink-0">
  @if (procesandoId === item.id) {
    <span class="animate-spin h-3.5 w-3.5 border-2 border-amber-600 border-t-transparent rounded-full"></span>
  } @else {
    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  }
</button>

<!-- Botón Autorizar — Verde -->
<button (click)="autorizarItem(item)"
        [disabled]="procesandoId === item.id"
        title="Autorizar"
        class="h-8 w-8 flex items-center justify-center rounded border border-green-400 text-green-700 bg-green-50 hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0">
  @if (procesandoId === item.id) {
    <span class="animate-spin h-3.5 w-3.5 border-2 border-green-600 border-t-transparent rounded-full"></span>
  } @else {
    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  }
</button>

<!-- Botón Rechazar / Eliminar — Rojo -->
<button (click)="rechazarItem(item)"
        [disabled]="procesandoId === item.id"
        title="Rechazar"
        class="h-8 w-8 flex items-center justify-center rounded border border-red-300 text-red-600 bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0">
  @if (procesandoId === item.id) {
    <span class="animate-spin h-3.5 w-3.5 border-2 border-red-500 border-t-transparent rounded-full"></span>
  } @else {
    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  }
</button>

<!-- Botón Firmar — Oscuro -->
<button (click)="firmarItem(item)"
        title="Firmar documento"
        class="h-8 w-8 flex items-center justify-center rounded bg-[#0f172a] text-white hover:bg-[#1e293b] transition-colors shrink-0">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
</button>

<!-- Contenedor de botones en la celda de acciones -->
<div class="flex items-center justify-center gap-1.5">
  <!-- botones aquí -->
</div>
```

---

## Reglas clave

- `table-fixed` siempre acompañado de `<colgroup>` con anchos explícitos en **todas** las columnas (una puede ser sin ancho para ser flexible).
- Los bordes verticales (`border-r border-slate-100`) van en cada celda, **excepto la última columna**.
- Los bordes horizontales van en `<tr>` (`border-b border-slate-200`), **no** en `<tbody>` con `divide-y`.
- El estado de **loading es skeleton rows** dentro de `<tbody>`, no un spinner externo. La tabla siempre está en el DOM.
- La **paginación** `<app-pagination>` es hermana del `div` de tabla, nunca hija.
- Textos largos en columnas fijas: usar `truncate` + `[title]="valor"` para tooltip.
- Todos los botones de acción: `h-8 w-8`, ícono `h-3.5 w-3.5`, con spinner del mismo color cuando `[disabled]`.
- El bloque `<style>` con las animaciones va al final del archivo HTML.
