# Estándares de Frontend — Sistema LIMS

Documento único que reemplaza a `LOADING_STANDARDS.md`, `SKELETON_LOADER_PROMPT.md`, `TABLE_STANDARDS.md`, `formularios-dinamicos-estandar.md` y `split-lista-formulario.md`. Toda esa documentación vive ahora aquí, organizada por tema.

## Índice

1. [Estructura general de página](#1-estructura-general-de-página)
2. [Patrón de componentes: Lista + Formulario](#2-patrón-de-componentes-lista--formulario)
3. [Tablas](#3-tablas)
4. [Estados de carga (loading / skeleton)](#4-estados-de-carga-loading--skeleton)
5. [Columna de acciones y menú contextual](#5-columna-de-acciones-y-menú-contextual)
6. [Autorizar / Rechazar](#6-autorizar--rechazar)
7. [Formularios dinámicos (motor basado en schema de backend)](#7-formularios-dinámicos-motor-basado-en-schema-de-backend)
8. [Módulos ya migrados al patrón lista/formulario](#8-módulos-ya-migrados-al-patrón-listaformulario)

---

## 1. Estructura general de página

Referencias canónicas: `src/app/features/lista-solicitudes/lista-solicitudes.html`, `src/app/features/lista-cotizaciones/lista-cotizaciones.html`.

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

En la práctica, la mayoría de páginas de administración usan `<app-page-header>` en vez de escribir la cabecera a mano (breadcrumb + título + subtítulo + acción opcional vía `pageAction`), y envuelven el contenido en `<div class="animate-in fade-in">` dentro de `<div class="max-w-7xl mx-auto">`.

> Para componentes embebidos dentro de otro (sin router propio, ej. un panel dentro de un split view), omitir el wrapper exterior y usar directamente:
> ```html
> <div class="bg-white p-8 rounded shadow-sm border border-slate-200 min-h-[70vh] animate-in fade-in">
> ```

**⚠️ Consecuencia importante para menús/popovers:** el wrapper `animate-in` usa `transform`, lo que crea un nuevo *containing block* CSS. Cualquier elemento hijo con `position: fixed` deja de posicionarse contra el viewport y se posiciona contra ese wrapper — ver la [regla de menú contextual](#53-regla-crítica-de-posicionamiento) en la sección 5.

---

## 2. Patrón de componentes: Lista + Formulario

Un feature CRUD típico se divide en tres piezas:
- `lista/` — tabla, paginación, acciones, PDF, permisos de lectura/acción
- `formulario/` — carga dinámica del schema (si aplica), form reactivo, guardar/actualizar
- padre (coordinador) — mínimo: `editingRecord`, referencia a la lista, título de página

### Reglas del FORMULARIO

- Si se monta siempre (no solo al crear), controla su propia visibilidad interna: `@if (canCreate() || editingRecord)`.
- `@Input() editingRecord: T | null` — cuando llega, parchea el form (`ngOnChanges` o `ngOnInit` si el componente se recrea con `@if`).
- `@Output() guardado` — emite tras guardar/actualizar exitosamente. El formulario **no** debe recargar la lista directamente; eso lo hace el padre.
- `@Output() cancelado` — emite al cancelar edición.
- `@Output() formularioReady` (cuando el schema es dinámico) — emite `{ nombre, fields, formularioId }` tras cargar el schema.
- Maneja internamente: carga del schema dinámico (si aplica), validadores, guardar, actualizar.

### Reglas de la LISTA

- `@Input() formularioId` / `@Input() fields` — cuando la lista necesita resolver nombres desde un schema dinámico compartido con el formulario.
- `@Input() editingRecordId` — resalta la fila en edición (ej. `[class.bg-amber-50]`).
- `@Output() editar` — emite el registro al hacer clic en "Editar" (botón directo o menú contextual).
- Si el padre necesita forzar una recarga tras guardar, expón un método público `cargarDatos()` invocable vía `@ViewChild`.
- Maneja internamente: autorizar, rechazar, eliminar, imprimir, PDF viewer, permisos de esa vista.

### Reglas del PADRE (coordinador)

Dos variantes válidas, ambas presentes en el proyecto:

**A) Vista única con recarga vía `@ViewChild`** (schemas dinámicos compartidos, ej. `horarios-laborales`, `por-contraloria`):
```typescript
@ViewChild(NombreLista) listaRef!: NombreLista;
editingRecord: VehiculoRecord | null = null;
formularioNombre = 'Título por defecto';
fields: FieldConfig[] = [];
formularioId: string | null = null;
canCreate = computed(...)  // solo si el padre necesita mostrarlo en el header

onFormularioReady(e): void  // guarda nombre, fields, formularioId
onEditar(record): void      // asigna editingRecord + scrollTo top
onGuardado(): void          // limpia editingRecord + llama listaRef.cargarDatos()
onCancelado(): void         // limpia editingRecord
```
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

**B) Swap de vista `lista ↔ formulario`** (CRUD plano sin schema dinámico compartido, ej. `calibracion-equipos`, `admin-catalogos`, `secuencial`):
```typescript
vista: 'lista' | 'formulario' = 'lista';
editingRecord: T | null = null;

irAFormulario(): void { this.editingRecord = null; this.vista = 'formulario'; }
onEditar(record: T): void { this.editingRecord = record; this.vista = 'formulario'; window.scrollTo({ top: 0, behavior: 'smooth' }); }
volverALista(): void { this.editingRecord = null; this.vista = 'lista'; }
```
```html
@if (vista === 'lista') {
  <app-<nombre>-lista (nuevo)="irAFormulario()" (editar)="onEditar($event)" />
}
@if (vista === 'formulario') {
  <app-<nombre>-formulario [editingRecord]="editingRecord" (guardado)="volverALista()" (cancelado)="volverALista()" />
}
```

Elige (A) cuando lista y formulario comparten un schema/`fields` cargado una sola vez; elige (B) para CRUD simple sin ese acoplamiento.

### Restricciones generales
- No mover el CSS del padre al hijo (o viceversa) al refactorizar.
- No cambiar selectores ni rutas de routing al dividir un componente monolítico.
- No duplicar llamadas al API: si el formulario ya carga un recurso compartido (ej. `fields`), la lista lo recibe por `@Input`, no lo vuelve a pedir.
- El botón "Nuevo"/"Agregar" puede vivir dentro del propio componente de lista (patrón mayoritario: `catalogo-lista`, `calibracion-equipos`) o en el slot `pageAction` de `<app-page-header>` (patrón de `admin-formularios`). Ambos son válidos; sé consistente dentro del mismo módulo.
- `standalone: true` solo donde ya se declaraba explícitamente; no es obligatorio repetirlo en componentes hijos nuevos.

---

## 3. Tablas

### Estructura de tabla completa

El estado de loading se renderiza como **skeleton rows dentro del `<tbody>`** vía el componente `TableSkeleton` (ver sección 4.1) — nunca con un spinner externo que oculte la tabla. La tabla siempre está presente en el DOM; solo cambia su contenido.

```html
<div class="border border-slate-200 rounded overflow-hidden">
  <div class="overflow-x-auto custom-scroll">
    <table class="w-full text-sm border-collapse table-fixed">

      <!-- colgroup: anchos explícitos para todas las columnas -->
      <colgroup>
        <col class="w-[150px]">
        <col class="w-[140px]">
        <col>                    <!-- columna flexible (sin ancho fijo) -->
        <col class="w-[90px]">
        <col class="w-[105px]">
        @if (hasAnyAction) {
          <col class="w-[120px]"> <!-- acciones: última columna -->
        }
      </colgroup>

      <thead>
        <tr class="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200 tracking-wider">
          <th class="px-3 py-2.5 border-r border-slate-100 text-left">Col. izquierda</th>
          <th class="px-3 py-2.5 border-r border-slate-100 text-center">Col. centrada</th>
          <!-- última columna: sin border-r -->
          @if (hasAnyAction) {
            <th class="px-2 py-2.5 text-center">Acciones</th>
          }
        </tr>
      </thead>

      <!-- tbody 1: skeleton (rows=0 cuando no está cargando → no renderiza nada) -->
      <tbody appTableSkeleton
        [rows]="loading ? 8 : 0"
        [cols]="4"
        [actionButtons]="hasAnyAction ? 1 : 0">
      </tbody>

      <!-- tbody 2: datos reales -->
      <tbody>
        @if (!loading) {
          @for (item of items; track item.id) {
            <tr class="border-b border-slate-200 hover:bg-slate-50 transition-colors">
              <td class="px-3 py-2.5 border-r border-slate-100 text-left">...</td>
              <td class="px-3 py-2.5 border-r border-slate-100 text-center">...</td>
              @if (hasAnyAction) {
                <td class="px-2 py-2.5 text-center">...</td>
              }
            </tr>
          } @empty {
            <tr>
              <td [attr.colspan]="hasAnyAction ? N+1 : N" class="p-10 text-slate-400 italic text-center">
                No hay registros.
              </td>
            </tr>
          }
        }
      </tbody>

    </table>
  </div>
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

> **Nota histórica:** versiones anteriores de este estándar mostraban filas `<tr class="animate-pulse">` escritas a mano dentro de un `@if (loading) { ... } @else { ... }`. Ese patrón está **reemplazado** por el componente `TableSkeleton` (sección 4.1) — no escribir `animate-pulse` inline en tablas nuevas.

### Clases por elemento

| Elemento | Clases |
|---|---|
| Wrapper tabla | `border border-slate-200 rounded overflow-hidden` |
| Wrapper scroll | `overflow-x-auto custom-scroll` |
| `<table>` | `w-full text-sm border-collapse table-fixed` (agregar `min-w-[Npx]` si hay muchas columnas) |
| `<thead> <tr>` | `bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200 tracking-wider` |
| `<th>` izquierda | `px-3 py-2.5 border-r border-slate-100 text-left` |
| `<th>` centrado | `px-3 py-2.5 border-r border-slate-100 text-center` |
| `<th>` última col | `px-2 py-2.5 text-center` |
| `<tbody>` | *(sin clases — los bordes van en `<tr>`)* |
| `<tr>` datos | `border-b border-slate-200 hover:bg-slate-50 transition-colors` (o `border-slate-100` en variantes más compactas) |
| `<td>` normal | `px-3 py-2.5 border-r border-slate-100` |
| `<td>` centrado | `px-3 py-2.5 border-r border-slate-100 text-center` |
| `<td>` última col | `px-2 py-2.5 text-center` |
| Fila vacía | `p-10 text-slate-400 italic text-center` |

### Tipos de celda de datos

**Texto principal (identificador / secuencial)**
```html
<td class="px-3 py-2.5 border-r border-slate-100 font-bold text-[#1d2b64] break-words"
    [title]="item.campo ?? '—'">
  {{ item.campo ?? '—' }}
</td>
```

**Texto largo truncado**
```html
<td class="px-3 py-2.5 border-r border-slate-100 text-slate-600 truncate"
    [title]="item.campo">
  {{ item.campo }}
</td>
```

**Fecha**
```html
<td class="px-3 py-2.5 border-r border-slate-100 text-center text-slate-500 whitespace-nowrap text-xs">
  {{ item.fecha_creacion | date:'dd/MM/yyyy' }}
</td>
```

**Texto centrado corto (periodo, código)**
```html
<td class="px-3 py-2.5 border-r border-slate-100 text-center text-slate-500 truncate"
    [title]="item.campo">
  {{ item.campo }}
</td>
```

### Badges de estado

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

> Usar `block w-full` dentro de `<td>` para que el badge ocupe el ancho de la celda. Para badges inline fuera de tabla usar `inline-block` en lugar de `block w-full`. Variante compacta (usada en listas con `TableSkeleton`): `inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-green-100 text-green-700` para "Activo" / `bg-slate-100 text-slate-500` para "Inactivo".

### Reglas clave

- `table-fixed` siempre acompañado de `<colgroup>` con anchos explícitos en **todas** las columnas (una puede quedar sin ancho para ser flexible).
- Los bordes verticales (`border-r border-slate-100`) van en cada celda, **excepto la última columna**.
- Los bordes horizontales van en `<tr>` (`border-b`), **no** en `<tbody>` con `divide-y`.
- El estado de **loading es skeleton rows** dentro de `<tbody>` vía `TableSkeleton`, no un spinner externo.
- La **paginación** `<app-pagination>` es hermana del `div` de tabla, nunca hija.
- Textos largos en columnas fijas: usar `truncate` + `[title]="valor"` para tooltip.
- Todos los botones de acción: `h-8 w-8`, ícono `h-3.5 w-3.5`, con spinner del mismo color cuando `[disabled]`.
- El bloque `<style>` con las animaciones (`animate-in`/`fade-in`) va al final del archivo HTML, cuando el componente lo declara inline en vez de un `.css` aparte.

---

## 4. Estados de carga (loading / skeleton)

Tres mecanismos conviven en el proyecto, cada uno para un caso distinto:

| Mecanismo | Cuándo usarlo |
|---|---|
| `TableSkeleton` (`tbody[appTableSkeleton]`) | Listados en tabla — es el estándar actual, reemplaza spinners y `animate-pulse` manual |
| `FieldSkeleton` (`<app-field-skeleton>`) | Un select/input individual mientras cargan sus opciones (ej. un combo) |
| `<app-loading>` | Secciones no tabulares: un formulario completo, un detalle, un cronograma — cuando no aplica el patrón de tabla |

### 4.1 Skeleton de tabla

En lugar de un spinner, se muestra la tabla completa con cabeceras visibles y filas de barras grises pulsantes en el `tbody`. Cuando llega la data real, esas filas se reemplazan por los datos.

**Componente:** `src/app/ui/table-skeleton/table-skeleton.ts`, selector `tbody[appTableSkeleton]` (se aplica sobre un `<tbody>` existente, no agrega un elemento extra al DOM).

**Inputs:**

| Input | Tipo | Default | Descripción |
|---|---|---|---|
| `rows` | `number` | `8` | Número de filas fantasma. Pasar `0` para no mostrar nada. |
| `cols` | `number` | `4` | Columnas de datos (sin contar la columna de acciones). |
| `actionButtons` | `number` | `0` | Número de botones de acción a simular en la última columna. |

**Estructura base:** ver el HTML completo en la sección 3 ("Estructura de tabla completa"). Se usan **dos `<tbody>` hermanos** en vez de un `@if/@else` externo — el parser de Angular rechaza `</tbody>` dentro de un bloque `@else` cuando hay condiciones en `<colgroup>` o `<thead>`.

```typescript
import { TableSkeleton } from '../../../../ui/table-skeleton/table-skeleton';

@Component({
  standalone: true,
  imports: [TableSkeleton, /* ... */],
})
```

**Reglas:**
1. Usar siempre `TableSkeleton` — no escribir `animate-pulse` inline en tablas.
2. `<colgroup>` y `<thead>` siempre visibles, fuera de cualquier `@if`.
3. `[rows]` usa el ternario `loading ? 8 : 0`.
4. `[cols]` cuenta solo columnas de datos, sin la de acciones (`[actionButtons]` la maneja aparte).
5. **No** envolver los dos `<tbody>` en un `@if (loading) { ... } @else { ... }` externo (ver nota del parser arriba).

### 4.2 Skeleton para campos de formulario

Para selects/inputs que dependen de un catálogo remoto, usar `FieldSkeleton` (`src/app/ui/field-skeleton/field-skeleton.ts`):

```html
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

**Verificación importante en el servicio:** si el loader no aparece y muestra vacío inmediatamente, revisar el servicio GraphQL. Si usa `watchQuery` + `valueChanges`, cambiarlo a `query` (single-shot):

```typescript
// ❌ Mal — emite un evento de carga con data:null antes de la respuesta real
this.apollo.use(CLIENT).watchQuery({ ... }).valueChanges.pipe(map(...))

// ✅ Bien — solo emite cuando llega la respuesta de red
this.apollo.use(CLIENT).query({ ... }).pipe(map(...))
```

### 4.3 Spinner genérico (`<app-loading>`)

**Ruta:** `src/app/shared/components/loading/loading.ts`. **Selector:** `<app-loading />`. Sin inputs — puro spinner centrado en el contenedor donde se coloque. Úsalo para secciones no tabulares (formularios, detalles, cronogramas) donde el patrón de tabla no aplica.

```typescript
import { LoadingComponent } from '../../shared/components/loading/loading';

@Component({
  imports: [..., LoadingComponent],
})
```

**Patrón 1 — loading dentro de una card** (el header/título siempre visible, el spinner reemplaza el contenido):
```html
<div class="max-w-7xl mx-auto bg-white p-8 rounded shadow-sm border border-slate-200">
  <div class="border-b border-slate-200 pb-6 mb-6">
    <h2 class="text-2xl font-bold text-[#1d2b64]">Título de la sección</h2>
  </div>

  @if (loading) {
    <app-loading />
  } @else {
    <!-- contenido real -->
  }
</div>
```

**Patrón 2 — loading que oculta múltiples secciones** (formulario + tabla inferior, por ejemplo):
```html
<div class="max-w-7xl mx-auto bg-white p-8 rounded shadow-sm border border-slate-200 mb-10">
  <div class="border-b border-slate-200 pb-6 mb-6">
    <h2 class="text-2xl font-bold text-[#1d2b64]">Título</h2>
  </div>
  @if (loading) {
    <app-loading />
  } @else {
    <form ...>...</form>
  }
</div>

@if (!loading) {
  <div class="max-w-7xl mx-auto bg-white rounded shadow-sm border border-slate-200">
    <!-- tabla u otro contenido -->
  </div>
}
```

**Ejemplos reales:** `formulario-detalle` (card + tabla condicional), `horarios-laborales` (header visible + form condicional + cronograma condicional).

### 4.4 Buscador/filtros durante la carga — según el mecanismo usado

Esta es una decisión que depende de qué mecanismo de loading usa la página, no una regla única:

- **Con `TableSkeleton`** (patrón actual, ej. `catalogo-lista`, `secuencial-lista`): el buscador permanece **siempre visible**, incluso mientras `loading = true`. No hay parpadeo que evitar porque la tabla nunca desaparece.
- **Con `<app-loading>`** (patrón más antiguo, ej. `admin-formularios`): el buscador se **oculta** con `@if (!loading)`, porque toda la sección de contenido (tabla + buscador) se reemplaza por el spinner mientras carga.

No mezclar ambos criterios dentro del mismo componente.

### 4.5 Reglas generales de estado loading/saving

| Regla | Detalle |
|---|---|
| Inicializar en `true` | `loading = true` (o `saving`/`loadingX`) como valor inicial del campo, para que el skeleton/spinner aparezca antes de que resuelva la llamada async. |
| Resetear en `next` **y** en `error` | Siempre volver a `false` en ambas ramas de la suscripción (directamente o con `finalize()`), para que el loader no se quede pegado. |
| No mostrar contenido vacío mientras carga | Ocultar listas/tablas con el mecanismo correspondiente (skeleton o `@if`). |
| El header estático puede quedar visible | Título, breadcrumb, metadata — no dependen del loading. |
| No agregar texto al spinner de `<app-loading>` | El componente no tiene `message`, solo el spinner. |

```typescript
loading = true;

private cargarDatos(): void {
  this.loading = true;
  this.miServicio.getData().subscribe({
    next: (data) => {
      this.datos = data;
      this.loading = false;
    },
    error: () => {
      this.loading = false;
      // mostrar error al usuario (toast)
    },
  });
}
```

Para operaciones puntuales por fila (autorizar/rechazar/deshabilitar), usar un campo `procesandoId` y `finalize()` — ver sección 6.

---

## 5. Columna de acciones y menú contextual

### 5.1 Cuándo incluirla

La columna de acciones solo se agrega cuando el usuario tiene permisos para realizar alguna acción (editar, eliminar, autorizar, rechazar, imprimir). Se controla con un flag `hasAnyAction` evaluado en el `.ts`:

```typescript
get hasAnyAction(): boolean {
  return this.canEdit() || this.canDelete() || this.canAutorizar() || this.canRechazar();
}
```

El `<colgroup>` y el `<thead>` condicionan esa columna con `@if (hasAnyAction)`. Si no aplica, no se agrega ni el `<col>` ni el `<th>`.

### 5.2 Botones directos vs menú contextual

- **Botones directos** — visibles siempre en la fila. Para acciones primarias: Autorizar, Rechazar.
- **Menú contextual (⋮)** — desplegable junto al botón. Para acciones secundarias: Editar, Eliminar, Imprimir.

Ambos conviven en la misma celda `<td class="px-2 py-2.5 text-center">`, dentro de `<div class="flex items-center justify-center gap-1.5">`.

```html
<td class="px-2 py-2.5 text-center">
  <div class="flex items-center justify-center gap-1.5">

    @if (canAutorizar()) {
      <button type="button" title="Autorizar" (click)="autorizarRegistro(item)"
        [disabled]="procesandoId === item.id"
        class="h-8 w-8 flex items-center justify-center rounded border border-green-400 text-green-700 bg-green-50 hover:bg-green-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0">
        <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    }

    @if (canRechazar()) {
      <button type="button" title="Rechazar" (click)="rechazarRegistro(item)"
        [disabled]="procesandoId === item.id"
        class="h-8 w-8 flex items-center justify-center rounded border border-red-300 text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0">
        <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    }

    @if (canEdit() || canDelete()) {
      <div class="relative">
        <button type="button" title="Más acciones" (click)="toggleMenu(item.id, $event)"
          class="h-8 w-8 flex items-center justify-center rounded border border-slate-300 text-slate-500 bg-white hover:bg-slate-100 transition-colors shrink-0">
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
          </svg>
        </button>
        @if (openMenuId === item.id) {
          <div class="absolute right-0 top-full mt-1 z-50 bg-white border border-slate-200 rounded-lg shadow-lg py-1 w-40">

            @if (canEdit()) {
              <button type="button" (click)="editar.emit(item); closeMenu()"
                class="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-amber-700 hover:bg-amber-50">
                <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editar
              </button>
            }

            @if (canDelete()) {
              <button type="button" (click)="eliminarRegistro(item); closeMenu()"
                class="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50">
                <svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Eliminar
              </button>
            }

            <!-- Acción condicional por estado, separada con borde -->
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
    }

  </div>
</td>
```

Al final del template (fuera de la tabla), el overlay de cierre:
```html
@if (openMenuId !== null) {
  <div class="fixed inset-0 z-40" (click)="closeMenu()"></div>
}
```

### 5.3 Regla crítica de posicionamiento

**NO usar `position: fixed` con coordenadas calculadas en JS** (`getBoundingClientRect()` + `[style.top.px]`/`[style.right.px]`). Los ancestros con `animate-in` u otras animaciones CSS (`transform`) crean un nuevo *containing block* que desplaza las coordenadas del viewport — el menú termina renderizándose fuera de lugar en cualquier página que use el wrapper `animate-in fade-in` de la sección 1.

El menú va **dentro del `@for` de filas**, en un `<div class="relative">` que envuelve el botón de los 3 puntos, con el desplegable en `absolute right-0 top-full`. Esto garantiza que siempre aparezca junto al botón sin importar transforms en los ancestros.

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

> **Corrección (2026-07-09):** este documento decía antes que `catalogo-lista.ts/html` usaba `fixed` + coordenadas calculadas y "funcionaba" por estar embebido sin wrapper `animate-in`. Eso era incorrecto — `admin-catalogos.html` sí tiene `animate-in fade-in`, así que el menú también quedaba mal posicionado ahí. Se auditó y corrigió: `catalogo-lista.ts/html`, `ensayo-lista.ts/html` y `ensayo-item-lista.ts/html` (en `admin-ensayos`) usaban el patrón viejo y ya fueron migrados al patrón `relative`/`absolute` de esta sección. Si encuentras otro componente con `menuPos`/`getBoundingClientRect()`, es candidato a la misma corrección.

### Resumen de reglas

- Todos los botones son `h-8 w-8`, con `shrink-0`.
- El contenedor siempre es `flex items-center justify-center gap-1.5`.
- El menú contextual va **dentro del `@for`**, en `<div class="relative">` alrededor del botón ⋮. **Nunca `position: fixed` con coordenadas.**
- El overlay `fixed inset-0 z-40` va al final del template (fuera de la tabla) y cierra el menú al hacer click fuera.
- El menú tiene `z-50` (mayor que el overlay).
- Acciones condicionales por estado (ej. Imprimir) van separadas con `border-t border-slate-100 mt-1 pt-1`.

### Colores por tipo de acción

| Acción | Color del botón | Color en el menú |
|---|---|---|
| Autorizar | `border-green-400 text-green-700 bg-green-50 hover:bg-green-100` | — |
| Rechazar | `border-red-300 text-red-600 bg-red-50 hover:bg-red-100` | — |
| Más acciones (⋮) | `border-slate-300 text-slate-500 bg-white hover:bg-slate-100` | — |
| Editar | — | `text-amber-700 hover:bg-amber-50` |
| Eliminar | — | `text-red-600 hover:bg-red-50` |
| Imprimir | — | `text-slate-600 hover:bg-slate-50` (separado con `border-t`) |
| Firmar (oscuro, fuera de menú) | `bg-[#0f172a] text-white hover:bg-[#1e293b]` | — |

---

## 6. Autorizar / Rechazar

Patrón estándar: `Swal.fire` para confirmación, `procesandoId` para deshabilitar el botón durante la petición, y el servicio de actualización correspondiente para cambiar el estado.

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
```

`rechazarRegistro` sigue el mismo patrón con `icon: 'warning'`, `ESTADO_RECHAZADO`, `confirmButtonColor: '#d33'`.

### Cómo adjuntar el registro relacionado (`_solicitud`) al cargar datos

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
| Eliminar / Deshabilitar | `'warning'` | `'#d33'` (rojo) | `'Sí, eliminar'` / `'Sí, deshabilitar'` |
| Habilitar | `'warning'` | `'#16a34a'` (verde) | `'Sí, habilitar'` |

`cancelButtonColor` siempre `'#6b7280'` (slate).

- Autorizar/Rechazar/Deshabilitar siempre usan `Swal.fire` + `procesandoId` + `[disabled]="procesandoId === item.id"` en el botón, con `finalize()` para resetear `procesandoId` (ver sección 4.5).

---

## 7. Formularios dinámicos (motor basado en schema de backend)

Contrato técnico para construir, renderizar y procesar formularios cuyo schema (preguntas, tipos, validaciones) viene de la base de datos. Cualquier componente que necesite mostrar un formulario configurable debe seguir este estándar.

### 7.1 Contrato de la API

```
GET /api/reportes/report-parametro/formulario-dinamico/:idFormulario
```

Respuesta esperada:
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

Estructura de `Pregunta`:

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | `string` | ID único del atributo en BD |
| `nombre` | `string` | Clave del control en el `FormGroup` (snake_case) |
| `pregunta` | `string` | Etiqueta visible al usuario |
| `orden` | `number` | Posición de renderizado (ascendente) |
| `tipo_respuesta` | `string` | `Texto`, `Fecha`, `Numerico`, `Selección Simple`, `Selección Mutiple` |
| `tipo_respuesta_id` | `number` | ID del catálogo del tipo de respuesta |
| `obligatorio` | `boolean` | Si el campo es requerido |
| `hidden` | `boolean` | Si el campo inicia oculto |
| `readonly` | `boolean` | Si el campo es solo lectura |
| `estado` | `boolean` | `false` = excluir del formulario |
| `num_caracter` | `number \| null` | Máximo de caracteres (>200 → textarea) |
| `ayuda` | `string \| null` | Placeholder / texto de ayuda |
| `catalogos` | `CatalogoItem[] \| null` | Opciones para selects |
| `jornada_laboral_item` | `JornadaItem[] \| null` | Ítems para selectores de horario |
| `atributo_id` | `string \| null` | ID de la pregunta padre para dependencias |
| `item_catalogo_id` | `string \| null` | Valor del padre que dispara la visibilidad |
| `is_ws_sri` / `is_ws_civil` / `is_ws_iess` | `boolean` | Habilita búsqueda SRI/Registro Civil/IESS al presionar Enter |

### 7.2 Tipos de campo (`controlType`)

El motor mapea `tipo_respuesta` a un `controlType` interno:

| `tipo_respuesta` | `controlType` | Elemento HTML | Nota |
|---|---|---|---|
| `Texto` | `text` | `<input type="text">` | |
| `Fecha` | `text` | `<input type="date">` | Se diferencia por `source.tipo_respuesta` |
| `Numerico` | `text` | `<input type="number">` | Se diferencia por `source.tipo_respuesta` |
| `Selección Simple` | `select` | `<select>` | Opciones desde `catalogos` |
| `Selección Mutiple` | `schedule` | Lista personalizada | Ítems desde `jornada_laboral_item` |
| Texto largo | `textarea` | `<textarea>` | Condición: `num_caracter > 200` |
| Coordenadas | `coordinates` | Doble input + mapa | Solo para `val_lati` / `val_long` |

### 7.3 Interfaz `FieldConfig`

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

### 7.4 Flujo de inicialización

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

`toFieldConfig(pregunta)` centraliza toda la transformación `Pregunta → FieldConfig`. No duplicar esta lógica en plantillas ni en otros servicios.

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

```typescript
private buildValidators(field: FieldConfig, isHidden: boolean): ValidatorFn[] {
  if (isHidden) return [];
  const v: ValidatorFn[] = [];
  if (field.required) v.push(Validators.required);
  if (field.maxLength) v.push(Validators.maxLength(field.maxLength));
  return v;
}
```

### 7.5 Sistema de dependencias

Un campo depende de otro cuando `atributo_id` y `item_catalogo_id` están presentes.

```
campo visible  ←→  form.get(padre.key).value === field.dependsOn.triggerValue
campo oculto   ←→  valor distinto al triggerValue
```

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

**Regla:** al ocultar un campo siempre limpiar su valor (evita enviar datos fantasma al backend).

### 7.6 Renderizado en plantilla

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

```typescript
getInputType(field: FieldConfig): string {
  const tipo = field.source.tipo_respuesta;
  if (tipo === 'Fecha') return 'date';
  if (tipo === 'Numerico') return 'number';
  return 'text';
}

get visibleFields(): FieldConfig[] {
  return this.fields.filter(f => !f.hidden);
}
```

Nunca usar `*ngIf="!field.hidden"` directamente en el `@for`; mantener la lógica de visibilidad centralizada en `syncFieldState`.

### 7.7 Integraciones externas (SRI, Civil, IESS)

Cuando `field.integrations.sri || field.integrations.civil` es `true`, el campo de texto incluye un botón de búsqueda:

```html
@if (field.integrations.sri || field.integrations.civil) {
  <button type="button" (click)="buscarIntegracion(field)">
    <svg .../>  <!-- ícono búsqueda -->
  </button>
}
```

`buscarIntegracion(field)` llama al servicio correspondiente y parchea el formulario con los datos encontrados. El campo acepta Enter como atajo: `(keydown.enter)="buscarIntegracion(field)"`.

### 7.8 Guardar datos

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

Siempre sanear IDs vacíos antes de enviar — deben ser `null`, no `''`:
```typescript
const payload = {
  ...this.formData,
  atributo_id:      this.formData.atributo_id      || null,
  item_catalogo_id: this.formData.item_catalogo_id || null,
  jornada_id:       this.formData.jornada_id       || null,
};
```

### 7.9 Validación de estado del campo

**Detección de campo inválido:**
```typescript
esCampoInvalido(key: string): boolean {
  const c = this.form.get(key);
  return !!c && c.invalid && (c.touched || c.dirty);
}
```

**Mensaje de error por tipo** — centralizado en un único método, devuelve `null` si el campo es válido o no ha sido tocado:
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

**Clases CSS de estado inválido** — solo el borde cambia a rojo, no se pinta el fondo:
```html
[class.border-red-500]="esCampoInvalido(field.key)"
```
La etiqueta también cambia de color: `[class.text-red-600]="esCampoInvalido(field.key)"`.

**Mensaje debajo del campo** — dentro del mismo wrapper `div`, después del elemento de entrada, y solo aparece tras `touched || dirty`:
```html
@if (getFieldError(field.key)) {
  <span class="text-red-500 text-[11px] mt-1">{{ getFieldError(field.key) }}</span>
}
```

**Patrón completo por campo:**
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

### 7.10 Buenas prácticas

| Regla | Motivo |
|---|---|
| Ordenar preguntas por `orden` en el `map()` del servicio | El backend puede devolver en orden arbitrario |
| Filtrar `estado !== false` antes de mapear | Los campos inactivos no deben aparecer |
| Usar `takeUntil(this.destroy$)` en todas las suscripciones | Previene memory leaks |
| `form.getRawValue()` en lugar de `form.value` al guardar | Incluye controles deshabilitados (campos readonly) |
| No recrear el `FormGroup` para dependencias | Causa parpadeo visual y pérdida de valores |
| Almacenar `hidden` en `FieldConfig`, no en el DOM | Permite consultar el estado desde TypeScript sin acceder al DOM |
| `String(source?.hidden) === 'true'` para campos boolean de API | La API puede devolver `"true"` como string en algunos campos |

### 7.11 Personalización de layout — grid con spans y reorden

Cuando el diseño visual requiere columnas de ancho variable o un orden distinto al `orden` de la API, usa estos tres patrones juntos.

**Reordenar campos (`DISPLAY_ORDER`):**
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

**Campos que ocupan varias columnas (`FIELD_SPAN`):**
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

**Grid unificado en la plantilla** — un único loop sobre `visibleFields` con CSS Grid, en vez de separar `regularFields`/`textareaFields` en dos bloques:
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
> Usa este patrón cuando necesites mezclar inputs y textareas en la misma cuadrícula posicional. Si todos los textareas van al final (ancho completo), el patrón `regularFields`/`textareaFields` separados sigue siendo válido y más simple.

**Override de `controlType` en `resolveControlType`** — cuando la API marca un campo como `is_text_area: true` pero el layout lo necesita como input compacto:
```typescript
private resolveControlType(pregunta: Pregunta): FieldConfig['controlType'] {
  if (pregunta.is_list_empleado) return 'employee-list';
  if (pregunta.tipo_respuesta === 'Selección Simple') return 'select';
  if (pregunta.nombre === 'val_observaciones') return 'textarea';
  if (pregunta.is_text_area && pregunta.nombre !== 'val_descripcion_actividad') return 'textarea';
  return 'text';
}
```
> Documenta siempre el motivo del override con un comentario en el código o en el PR. El campo sigue recibiendo `maxLength` desde `num_caracter`, por lo que la validación de longitud no se pierde.

### 7.12 Ejemplo 1 — Formulario simple (ID: 1002, Gestión de Vehículos)

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

El template usa el patrón de grid unificado (sección 7.11). Resultado: 9 campos con orden visual controlado, campos span-2 (`val_funcionario_id`, `val_observaciones`) y hora inputs (`val_hora_salida`, `val_hora_retorno`) renderizados como `type="time"`.

### 7.13 Ejemplo 2 — Formulario complejo (ID: 380, Solicitud de Trabajo)

**18 campos · Dependencias encadenadas · Integraciones SRI/Civil · Secciones**

Campos con dependencias:
- `val_ced_op` visible solo cuando `val_ct_tipo = "Cédula"`
- `val_ruc_op` visible solo cuando `val_ct_tipo = "RUC"`
- `val_pasaporte` visible solo cuando `val_ct_tipo = "Pasaporte"`

```
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

### 7.14 Diagrama de flujo

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

---

## 8. Módulos ya migrados al patrón lista/formulario

| Módulo | Fecha | Notas |
|--------|-------|-------|
| `horarios-laborales` | 2026-05-28 | Referencia principal del patrón (variante A, `@ViewChild`) |
| `por-contraloria` | 2026-05-28 | `eliminarContraloria`, agrupa por `val_fecha_movilizacion`, context menu itera `solicitudesAgrupadas` |
| `calibracion-equipos` | — | Variante B (swap de vista lista/formulario) |
| `admin-catalogos` | — | Variante B, split-panel embebido (catálogo + ítems) |
| `secuencial` | 2026-07-09 | Variante B, `TableSkeleton` + `FieldSkeleton`, constructor visual del campo `formato` |
| `admin-formularios` | 2026-07-09 | Migrado de componente monolítico + modal a variante B (`lista/`, `formulario/`). Conserva un tercer estado `formularioSeleccionado` para la vista de detalle (`formulario-detalle`), ortogonal a `vista`. Buscador ahora siempre visible (usa `TableSkeleton`). El combo de tipos de formulario pasó de `watchQuery`+`valueChanges` a `CatalogoService.getAllItemsAdmin(9)` (`.query` single-shot) + `FieldSkeleton` |
