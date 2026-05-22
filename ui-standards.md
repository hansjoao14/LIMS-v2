# UI Standards — SGIA/LIMS Design System

> Referencia única de estándares visuales para todos los módulos del sistema.
> NO crear estilos fuera de este documento. NO usar valores hardcodeados arbitrarios.

---

## 1. Paleta de colores

| Token | Valor | Uso |
|-------|-------|-----|
| `primary` | `#1e3a8a` | Color institucional principal — títulos, bordes activos, íconos |
| `primary-alt` | `#1d2b64` | Variante oscura — usado en `PageHeader` y firma |
| `primary-hover` | `#2541b2` | Hover de botón primario |
| `primary-dark` | `#25377f` | Botones de acción secundaria (buscar, integración) |
| `primary-darker` | `#1e2d6b` | Hover de `primary-dark` |
| `surface` | `bg-slate-50` | Fondo de página principal |
| `card` | `bg-white` | Fondo de tarjetas y modales |
| `section-header` | `#f8fafc` | Fondo de cabeceras de sección dentro de cards |
| `border` | `border-slate-200` | Bordes de cards y contenedores |
| `border-section` | `border-slate-300` | Separadores internos de sección |
| `text-primary` | `text-slate-700` | Texto de cuerpo principal |
| `text-muted` | `text-slate-500` / `text-slate-600` | Texto secundario / subtítulos |
| `text-label` | `text-[#1e3a8a]` | Labels de campos de formulario |
| `error` | `text-red-600` / `border-red-500` | Estado de error en campos |

---

## 2. Wrapper global (obligatorio en todos los módulos)

Todo módulo principal debe tener exactamente este shell exterior para garantizar que al navegar entre módulos el layout no "salte" — solo cambia el contenido interior.

```html
<!-- Shell exterior: IDÉNTICO en todos los módulos -->
<div class="p-6 bg-slate-50 min-h-screen text-slate-700 font-sans pb-24">
  <div class="max-w-7xl mx-auto">
    <div class="animate-in fade-in">

      <app-page-header ... />

      <!-- contenido del módulo -->

    </div>
  </div>
</div>
```

**Reglas del wrapper:**
- `p-6` — padding uniforme de 24px en todos los lados
- `bg-slate-50` — fondo de página institucional
- `min-h-screen` — evita que la página se corte en vistas con poco contenido
- `text-slate-700 font-sans` — tipografía base
- `pb-24` — espacio inferior para la navegación flotante (siempre `pb-24`, no `pb-20`)
- `max-w-7xl mx-auto` — ancho máximo centrado, **igual en todos los módulos** (Patrón A y B)
- `<div class="animate-in fade-in">` — wrapper de animación de entrada del módulo. El PageHeader va DENTRO de este div, no fuera
- **Prohibido:** `space-y-6` en el contenedor — provoca márgenes acumulados entre PageHeader y cards. Usar `mb-6` explícito en las cards cuando se necesite separación

---

## 3. Patrones de layout

El sistema tiene **dos patrones de layout** según el tipo de módulo. No mezclarlos.

---

### Patrón A — Formulario multi-paso

Usado en: `solicitud-trabajo`, formularios con stepper.

La página tiene fondo `bg-slate-50`. Cada paso es su propia card blanca flotante.

```
bg-slate-50 (página)
  └── max-w-6xl mx-auto (contenedor)
        ├── app-page-header
        ├── stepper (progress bar)
        └── step-card (bg-white, por cada paso)
              ├── step-header (título + separador)
              ├── section-card × N (secciones de formulario)
              └── nav-buttons (Regresar / Siguiente)
```

```html
<!-- Patrón A: página -->
<div class="p-6 bg-slate-50 min-h-screen text-slate-700 font-sans pb-24">
  <div class="max-w-7xl mx-auto">

    <app-page-header ... />

    <!-- stepper -->
    <div class="mb-6"> ... </div>

    <form [formGroup]="form">
      <!-- cada paso es un componente que renderiza una step-card -->
      <app-step1 ... />
    </form>

  </div>
</div>
```

---

### Patrón B — Listado / tabla

Usado en: `lista-solicitudes`, `lista-cotizaciones`, vistas de consulta.

El PageHeader está a nivel de página (igual que en Patrón A). La tabla va en su propia card sin padding interior — usa `overflow-hidden` para respetar el border-radius. La paginación queda fuera de la card.

Si el listado tiene una vista de detalle/acción (ej. firma), esa vista sigue el **Nivel 1A (step-card)** con su propio step-header, igual que en formularios multi-paso.

```
bg-slate-50 (página)
  └── max-w-7xl mx-auto (contenedor de anchura, sin fondo)
        ├── app-page-header  ← a nivel de página, fuera de cualquier card
        ├── table-card (bg-white rounded-lg shadow-sm border, sin padding)
        │     └── <table> (ocupa todo el ancho de la card)
        └── app-pagination   ← fuera de la card
```

```html
<!-- Patrón B: página -->
<div class="p-6 bg-slate-50 min-h-screen text-slate-700 font-sans pb-24">
  <div class="max-w-7xl mx-auto">

    <!-- PageHeader fuera de cualquier card -->
    <app-page-header ... />

    <!-- Table-card: sin padding, overflow-hidden para el border-radius -->
    <div class="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <table class="w-full text-sm border-collapse table-fixed">
        ...
      </table>
    </div>

    <!-- Paginación fuera de la card -->
    <app-pagination ... />

  </div>
</div>
```

#### Vista de detalle / acción dentro de un listado

Cuando un listado tiene una sub-vista (firma, edición, detalle), se renderiza como **step-card (Nivel 1A)** con su PageHeader a nivel de página:

```html
<!-- PageHeader a nivel de página -->
<app-page-header title="Acción" [subtitle]="'N° ' + doc.codigo">
  <div #pageAction pageAction class="text-right text-[13px] text-slate-700">
    <!-- metadatos del documento -->
  </div>
</app-page-header>

<!-- Step-card (Nivel 1A) — igual que en formularios -->
<div class="bg-white rounded-lg shadow-sm border border-slate-200 p-8 animate-in slide-in-from-right-4">

  <!-- Step-header (Nivel 2A) -->
  <div class="mb-6 border-b border-slate-300 pb-4">
    <h3 class="text-lg font-bold text-[#1e3a8a] mb-1">Título de la acción</h3>
    <p class="text-sm text-slate-700">Descripción.</p>
  </div>

  <!-- contenido -->

  <!-- Nav buttons estándar -->
  <div class="flex justify-between pt-4 border-t border-slate-300 mt-8">
    <button type="button" ... class="bg-white border border-slate-300 text-slate-700 px-8 py-2.5 rounded text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">
      REGRESAR
    </button>
    <button type="button" ... class="bg-[#1e3a8a] text-white px-8 py-2.5 rounded text-sm font-bold shadow-md hover:bg-[#2541b2] transition-all disabled:opacity-60 disabled:cursor-not-allowed">
      ACCIÓN
    </button>
  </div>

</div>
```

---

## 4. PageHeader

Componente compartido obligatorio en todos los módulos. Ubicado en `src/app/shared/components/page-header`.

```html
<app-page-header
  breadcrumbSection="Nombre de la sección"
  title="Título del módulo"
  subtitle="Descripción breve"
  codigoFormulario="F-XX-XX-XX"
  [elaboradoPor]="nombreUsuario"
  [fechaSolicitud]="fechaActual"
  edicion="24"
/>
```

- `breadcrumbSection`: texto que aparece en el breadcrumb
- `title`: puede ser dinámico `[title]="formulario?.nombre ?? 'Fallback'"`
- `codigoFormulario`: código del formulario institucional
- Para módulos con botón de acción (admin), usar `<ng-content select="[pageAction]">`

---

## 5. Jerarquía de Cards

El sistema tiene **5 niveles de card** con propósito y clases diferentes. Cada nivel solo se usa dentro del nivel que le corresponde.

```
Nivel 0 — Página (bg-slate-50)
  Nivel 1 — Step-card o Container-card
    Nivel 2A — Step-header (separador con título)
    Nivel 2B — Section-card (sección con cabecera coloreada)
    Nivel 2C — Table-card (tabla de datos o catálogo)
    Nivel 2D — Status-card (card de estado: pendiente / éxito / error)
    Nivel 2E — Note-card (nota informativa)
```

---

### Nivel 1A — Step-card (Patrón A: formularios multi-paso)

Cada paso del stepper es un componente que renderiza esta card. Siempre incluye animación de entrada.

```html
<!-- Primer paso: entra desde abajo -->
<div class="bg-white rounded-lg shadow-sm border border-slate-200 p-8 animate-in fade-in slide-in-from-bottom-4">
  <!-- Nivel 2A: step-header -->
  <!-- Nivel 2B: section-cards -->
  <!-- nav-buttons -->
</div>

<!-- Pasos intermedios / último: entran desde la derecha -->
<div class="bg-white rounded-lg shadow-sm border border-slate-200 p-8 space-y-8 animate-in fade-in slide-in-from-right-4">
  <!-- Nivel 2A: step-header -->
  <!-- Nivel 2B: section-cards -->
  <!-- nav-buttons -->
</div>
```

- `p-8` — padding interno estándar de la step-card
- `space-y-8` — espaciado entre section-cards cuando hay varias
- Animación obligatoria: primer paso `slide-in-from-bottom-4`, los demás `slide-in-from-right-4`

---

### Nivel 1B — Container-card (Patrón B: listados)

El contenedor único blanco que envuelve toda la página de listado.

```html
<div class="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-slate-200 min-h-[70vh]">
  <app-page-header ... />
  <!-- tabla -->
</div>
```

---

### Nivel 2A — Step-header (título interno de paso)

Va al inicio de cada step-card, antes de las section-cards. Es un separador visual con el título del paso.

```html
<div class="mb-6 border-b border-slate-300 pb-4">
  <h3 class="text-lg font-bold text-[#1e3a8a] mb-1">Título del paso</h3>
  <p class="text-sm text-slate-700">Descripción o información adicional.</p>
</div>
```

- `border-b border-slate-300` — línea divisora inferior
- `mb-6` — separación antes de las secciones
- `h3` — nivel correcto dentro de la jerarquía (`h2` es del PageHeader)
- La descripción (`<p>`) es opcional

---

### Nivel 2B — Section-card (sección de formulario con cabecera)

Agrupa campos relacionados dentro de una step-card. Tiene cabecera con fondo institucional.

```html
<section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">

  <!-- Cabecera de sección -->
  <div class="bg-[#f8fafc] border-b border-slate-200 px-5 py-3">
    <h4 class="font-bold text-[#1e3a8a] text-sm uppercase">Nombre de la sección</h4>
  </div>

  <!-- Cuerpo: grid de campos -->
  <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- campos de formulario -->
  </div>

</section>
```

Variantes del cuerpo según el contenido:

```html
<!-- Grid de 2 columnas (campos estándar) -->
<div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">

<!-- Grid flexible (coordenadas / inline items) -->
<div class="p-5 bg-white flex flex-wrap items-center gap-4">

<!-- Área de texto libre (observaciones) -->
<div class="p-5">

<!-- Con espaciado vertical entre bloques internos -->
<div class="p-5 space-y-4">
```

- `rounded-sm` — radio menor que la step-card para mantener jerarquía visual
- `overflow-hidden` — para que la cabecera respete el border-radius
- `shadow-sm` — elevación sutil para distinguir del fondo de la card
- `h4` — nivel correcto dentro de la jerarquía

---

### Nivel 2C — Table-card (tabla de catálogo o datos)

Para tablas de selección masiva (catálogo de ensayos, matrices, etc.) dentro de una step-card.

```html
<div class="border border-gray-200 rounded overflow-hidden shadow-sm">

  <!-- Cabecera de columnas -->
  <div class="grid grid-cols-[80px_1fr_1fr_1fr] bg-slate-50 border-y border-gray-200">
    <div class="px-3 py-3 text-[10px] font-bold text-slate-700 uppercase text-center border-r">
      Requerido
    </div>
    <div class="px-3 py-3 text-[10px] font-bold text-slate-700 uppercase border-r">
      Columna
    </div>
  </div>

  <!-- Filas -->
  <div class="grid grid-cols-[80px_1fr_1fr_1fr] border-b border-gray-100 items-center hover:bg-slate-50 transition-colors">
    <div class="px-3 py-3 flex justify-center border-r">
      <!-- toggle switch -->
    </div>
    <div class="px-3 py-3 text-[11px] text-slate-700 border-r">valor</div>
  </div>

</div>
```

- Usar `border-gray-200` (no `border-slate-200`) para tables de catálogo — diferencia visual sutil
- Cabecera de grupo colapsable:

```html
<div class="flex items-center gap-2 px-3 py-2 bg-slate-50 border-b border-gray-100 cursor-pointer hover:bg-slate-100 transition-colors"
     (click)="toggleCollapse(i)">
  <span class="flex items-center justify-center w-5 h-5 rounded bg-[#1e3a8a] text-white text-[10px] font-bold transition-transform"
        [class.rotate-180]="grupo.collapsed">&#8964;</span>
  <span class="text-[11px] font-bold text-[#1e3a8a] uppercase ml-1">{{ grupo.nombre }}</span>
</div>
```

---

### Nivel 2D — Status-card (card de estado)

Para el paso de confirmación final. Muestra el estado de la operación.

```html
<!-- Estado pendiente (esperando acción del usuario) -->
<div class="border border-slate-200 rounded-lg p-6 bg-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
  <div>
    <p class="text-xs font-bold text-slate-400 uppercase tracking-wide">Orden de Trabajo</p>
    <p class="text-lg font-mono font-bold text-slate-400 mt-1 italic">Pendiente de finalización</p>
    <p class="text-[11px] text-slate-400 mt-1">Mensaje de ayuda.</p>
  </div>
  <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400">
    <!-- ícono -->
  </div>
</div>

<!-- Estado exitoso (operación completada) -->
<div class="border border-green-300 rounded-lg p-6 bg-green-50/40 flex flex-col md:flex-row justify-between items-center gap-6">
  <div>
    <p class="text-xs font-bold text-green-700 uppercase tracking-wide">Éxito</p>
    <p class="text-2xl font-mono font-bold text-slate-800 mt-1">{{ codigo }}</p>
    <p class="text-[11px] text-green-600 mt-1 font-medium">Mensaje de confirmación.</p>
  </div>
  <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600">
    <!-- ícono check -->
  </div>
</div>
```

---

### Nivel 2E — Note-card (nota informativa)

Para notas, advertencias o información contextual dentro de una section o step.

```html
<div class="bg-slate-50 border border-slate-200 rounded p-4">
  <p class="text-[11px] font-bold text-slate-800 mb-2">ⓘ Notas Importantes:</p>
  <ul class="list-decimal pl-4 space-y-1">
    <li class="text-[11px] text-slate-600 leading-tight">Nota aquí.</li>
  </ul>
</div>
```

---

### Ejemplo completo: composición de un paso

```html
<!-- Step-card (Nivel 1A) -->
<div class="bg-white rounded-lg shadow-sm border border-slate-200 p-8 space-y-8 animate-in fade-in slide-in-from-right-4">

  <!-- Step-header (Nivel 2A) -->
  <div class="mb-6 border-b border-slate-300 pb-4">
    <h3 class="text-lg font-bold text-[#1e3a8a] mb-1">2. Información del Operador</h3>
    <p class="text-sm text-slate-700">Complete los datos del operador.</p>
  </div>

  <!-- Section-card 1 (Nivel 2B) -->
  <section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
    <div class="bg-[#f8fafc] border-b border-slate-200 px-5 py-3">
      <h4 class="font-bold text-[#1e3a8a] text-sm uppercase">Identificación</h4>
    </div>
    <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- campos -->
    </div>
  </section>

  <!-- Section-card 2 (Nivel 2B) -->
  <section class="border border-slate-200 rounded-sm overflow-hidden shadow-sm">
    <div class="bg-[#f8fafc] border-b border-slate-200 px-5 py-3">
      <h4 class="font-bold text-[#1e3a8a] text-sm uppercase">Contacto</h4>
    </div>
    <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- campos -->
    </div>
  </section>

  <!-- Note-card (Nivel 2E) -->
  <div class="bg-slate-50 border border-slate-200 rounded p-4">
    <p class="text-[11px] font-bold text-slate-800 mb-2">ⓘ Notas:</p>
    <ul class="list-decimal pl-4 space-y-1">
      <li class="text-[11px] text-slate-600 leading-tight">Nota de ayuda.</li>
    </ul>
  </div>

  <!-- Nav buttons (siempre al final, separados por border-t) -->
  <div class="flex justify-between pt-4 border-t border-slate-300">
    <button type="button" (click)="prev.emit()"
      class="bg-white border border-slate-300 text-slate-700 px-8 py-2.5 rounded text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">
      REGRESAR
    </button>
    <button type="button" (click)="next.emit()" [disabled]="cargando"
      class="bg-[#1e3a8a] text-white px-8 py-2.5 rounded text-sm font-bold shadow-md hover:bg-[#2541b2] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2">
      SIGUIENTE
    </button>
  </div>

</div>
```

---

## 6. Tipografía

| Elemento | Clases |
|----------|--------|
| Título de módulo (PageHeader) | `text-2xl font-bold text-[#1d2b64]` |
| Título de paso / sección principal | `text-xl font-bold text-[#1e3a8a]` |
| Subtítulo de sección | `text-sm text-slate-500 mt-1` |
| Cabecera de sección interna | `font-bold text-[#1e3a8a] text-sm uppercase` |
| Label de campo | `text-[11px] font-bold text-[#1e3a8a] uppercase mb-1` |
| Micro-label / badge | `text-[10px] font-bold text-[#1e3a8a] uppercase` |
| Texto de cuerpo | `text-sm text-slate-700` |
| Texto auxiliar / ayuda | `text-xs text-slate-500` |
| Breadcrumb | `text-sm font-medium text-slate-500` |

**Regla:** Nunca usar `font-extrabold` en interfaces. Máximo `font-bold`.

---

## 7. Formularios

### Label de campo

```html
<label
  class="block text-[11px] font-bold text-[#1e3a8a] uppercase mb-1"
  [class.text-red-600]="esCampoInvalido('campo')"
>
  NOMBRE DEL CAMPO
  @if (requerido) { <span class="text-red-500">*</span> }
</label>
```

### Input de texto

```html
<input
  formControlName="campo"
  type="text"
  class="w-full border border-slate-300 p-2.5 rounded text-sm bg-white outline-none focus:border-[#1e3a8a]"
  [class.border-red-500]="esCampoInvalido('campo')"
  [placeholder]="label"
/>
```

### Input readonly / deshabilitado

```html
<input
  formControlName="campo"
  type="text"
  class="w-full border border-slate-200 p-2.5 rounded text-sm bg-slate-50 text-slate-500 outline-none"
  readonly
/>
```

### Select

```html
<select
  formControlName="campo"
  class="w-full border border-slate-300 p-2.5 rounded text-sm bg-white outline-none focus:border-[#1e3a8a]"
  [class.border-red-500]="esCampoInvalido('campo')"
>
  <option value="">Seleccione...</option>
</select>
```

### Textarea

```html
<textarea
  formControlName="campo"
  [rows]="3"
  class="w-full border border-slate-300 rounded p-3 text-sm resize-none outline-none focus:border-[#1e3a8a] bg-white"
  [class.border-red-500]="esCampoInvalido('campo')"
></textarea>
```

### Input con botón integrado (búsqueda / integración)

```html
<div class="flex gap-0">
  <input
    formControlName="campo"
    class="w-full border border-slate-300 p-2.5 text-sm outline-none focus:border-[#1e3a8a] bg-white rounded-l"
  />
  <button
    type="button"
    class="bg-[#25377f] text-white px-4 rounded-r hover:bg-[#1e2d6b] transition-colors border border-[#25377f] flex items-center justify-center"
  >
    <!-- ícono -->
  </button>
</div>
```

### Mensaje de error de campo

```html
<p class="text-red-500 text-xs mt-1">Mensaje de error</p>
```

### Grids de formulario estándar

```html
<!-- 3 columnas -->
<div class="grid grid-cols-12 gap-6">
  <div class="col-span-12 md:col-span-4">...</div>
</div>

<!-- 2 columnas -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">...</div>

<!-- Full width dentro de grid 2 col -->
<div class="col-span-2">...</div>
```

---

## 8. Botones

### Primario (acción principal)

```html
<button
  type="button"
  class="bg-[#1e3a8a] text-white px-8 py-2.5 rounded text-sm font-bold shadow-md hover:bg-[#2541b2] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
>
  ACCIÓN
</button>
```

### Secundario (regresar / cancelar)

```html
<button
  type="button"
  class="bg-white border border-slate-300 text-slate-700 px-8 py-2.5 rounded text-sm font-bold shadow-sm hover:bg-slate-50 transition-all"
>
  REGRESAR
</button>
```

### Primario con spinner de carga

```html
<button
  type="button"
  [disabled]="cargando"
  class="bg-[#1e3a8a] text-white px-8 py-2.5 rounded text-sm font-bold shadow-md hover:bg-[#2541b2] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
>
  @if (cargando) {
    <span class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
    Guardando...
  } @else {
    GUARDAR
  }
</button>
```

### Botón de acción en tabla (icono)

```html
<!-- Editar -->
<button
  class="h-8 w-8 flex items-center justify-center rounded border border-amber-400 text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors"
>
</button>

<!-- Eliminar -->
<button
  class="h-8 w-8 flex items-center justify-center rounded border border-red-300 text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
>
</button>
```

**Regla:** Todo botón dentro de un `<form>` debe llevar `type="button"` explícito para evitar submit accidental.

---

## 9. Navegación de pasos (Stepper)

```html
<div class="mb-6">
  <div class="flex justify-between items-center mb-3">
    <p class="text-xl font-bold text-[#1e3a8a] uppercase tracking-tight">
      CÓDIGO - NOMBRE DEL FORMULARIO
    </p>
    <span class="text-[10px] font-bold text-[#1e3a8a] bg-blue-100 px-3 py-1 rounded-full uppercase tracking-widest">
      PASO {{ currentStep }} DE {{ totalSteps }}
    </span>
  </div>
  <div class="flex items-center gap-2">
    @for (s of steps; track $index) {
      <div
        class="flex-1 h-2.5 rounded-full transition-all duration-500"
        [class.bg-[#2541b2]]="currentStep >= s"
        [class.bg-slate-200]="currentStep < s"
      ></div>
    }
  </div>
</div>
```

### Barra de navegación al pie de cada paso

```html
<div class="flex justify-between pt-4 border-t border-slate-300">
  <button type="button" (click)="prev.emit()"
    class="bg-white border border-slate-300 text-slate-700 px-8 py-2.5 rounded text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">
    REGRESAR
  </button>
  <button type="button" (click)="next.emit()" [disabled]="cargando"
    class="bg-[#1e3a8a] text-white px-8 py-2.5 rounded text-sm font-bold shadow-md hover:bg-[#2541b2] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2">
    @if (cargando) {
      <span class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
      Guardando...
    } @else {
      SIGUIENTE
    }
  </button>
</div>
```

### Primer paso (sin botón regresar)

```html
<div class="flex justify-end">
  <button type="button" (click)="next.emit()" ...>SIGUIENTE</button>
</div>
```

### Último paso (sin botón siguiente)

```html
<div class="flex pt-4 border-t border-slate-300">
  <button type="button" (click)="accion.emit()" ...>ACCIÓN FINAL</button>
</div>
```

---

## 10. Tablas

```html
<div class="border border-slate-200 rounded">
  <table class="w-full text-sm border-collapse table-fixed">
    <thead>
      <tr class="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200 tracking-wider">
        <th class="px-3 py-2.5 border-r border-slate-100 text-left">COLUMNA</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-slate-200 hover:bg-slate-50 transition-colors">
        <td class="px-3 py-2.5 border-r border-slate-100 text-slate-600">valor</td>
      </tr>
      <!-- empty state -->
      <tr>
        <td colspan="N" class="p-10 text-slate-400 italic text-center">
          No hay registros.
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### Skeleton loader de tabla

```html
<tr class="border-b border-slate-200 animate-pulse">
  <td class="px-3 py-3 border-r border-slate-100">
    <div class="h-3 bg-slate-200 rounded w-3/4"></div>
  </td>
</tr>
```

### Badges de estado en tabla

```html
<!-- Creado -->
<span class="block text-center py-0.5 border border-blue-400 text-blue-700 font-bold text-[10px] rounded bg-blue-50">Creado</span>
<!-- Pendiente -->
<span class="block text-center py-0.5 border border-amber-400 text-amber-700 font-bold text-[10px] rounded bg-amber-50">Pendiente</span>
<!-- Autorizado / Éxito -->
<span class="block text-center py-0.5 border border-green-400 text-green-700 font-bold text-[10px] rounded bg-green-50">Autorizado</span>
<!-- Rechazado / Error -->
<span class="block text-center py-0.5 border border-red-400 text-red-700 font-bold text-[10px] rounded bg-red-50">Rechazado</span>
<!-- Neutro -->
<span class="block text-center py-0.5 border border-slate-300 text-slate-500 font-bold text-[10px] rounded bg-slate-50">Estado</span>
```

### Tabla de ensayos / catálogo (con toggle)

```html
<div class="border border-gray-200 rounded overflow-hidden shadow-sm">
  <!-- Cabecera de columnas -->
  <div class="grid grid-cols-[80px_1fr_1fr_1fr] bg-slate-50 border-y border-gray-200">
    <div class="px-3 py-3 text-[10px] font-bold text-slate-700 uppercase text-center border-r">Requerido</div>
    <div class="px-3 py-3 text-[10px] font-bold text-slate-700 uppercase border-r">Columna</div>
  </div>
  <!-- Fila -->
  <div class="grid grid-cols-[80px_1fr_1fr_1fr] border-b border-gray-100 items-center hover:bg-slate-50 transition-colors">
    <div class="px-3 py-3 flex justify-center border-r">
      <!-- toggle switch -->
    </div>
    <div class="px-3 py-3 text-[11px] text-slate-700 border-r">valor</div>
  </div>
</div>
```

---

## 11. Toggle Switch

```html
<button
  type="button"
  (click)="toggle()"
  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
  [class.bg-[#1e3a8a]]="activo"
  [class.bg-gray-300]="!activo"
>
  <span
    class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform"
    [class.translate-x-6]="activo"
    [class.translate-x-1]="!activo"
  ></span>
</button>
<span class="text-xs font-bold w-6"
  [class.text-[#1e3a8a]]="activo"
  [class.text-slate-400]="!activo">
  {{ activo ? 'SÍ' : 'NO' }}
</span>
```

Variante compacta (para tablas):

```html
<!-- h-5 w-10 con thumb h-3 w-3 -->
<button class="relative inline-flex h-5 w-10 items-center rounded-full transition-colors" ...>
  <span class="inline-block h-3 w-3 transform rounded-full bg-white transition-transform" ...></span>
</button>
```

---

## 12. Modales

### Estructura base de modal

```html
@if (showModal) {
  <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in p-4">
    <div class="bg-white rounded-lg shadow-2xl w-full max-w-xl mx-4 flex flex-col max-h-[85vh]">

      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h3 class="text-base font-bold text-[#1e3a8a] uppercase tracking-wide">
          Título del Modal
        </h3>
        <button type="button" (click)="showModal = false"
          class="text-slate-400 hover:text-red-500 text-xl leading-none">
          &times;
        </button>
      </div>

      <!-- Body scrollable -->
      <div class="overflow-y-auto px-6 py-4 flex-1 custom-scroll">
        <!-- contenido -->
      </div>

      <!-- Footer -->
      <div class="px-6 py-3 border-t border-gray-200">
        <div class="flex gap-3">
          <button type="button" (click)="showModal = false"
            class="flex-1 border border-gray-300 text-slate-700 font-bold uppercase text-xs py-3 rounded hover:bg-gray-50">
            Cerrar
          </button>
          <button type="button" (click)="confirmar()"
            class="flex-1 bg-[#1e3a8a] text-white font-bold uppercase text-xs py-3 rounded hover:bg-[#2541b2]">
            Confirmar
          </button>
        </div>
      </div>

    </div>
  </div>
}
```

### Tamaños de modal

| Uso | Clase |
|-----|-------|
| Pequeño (confirmación) | `max-w-sm` |
| Estándar (formulario / legal) | `max-w-xl` |
| Mediano (mapa / selector) | `max-w-2xl` |
| Grande (tabla / listado) | `max-w-4xl` |

### z-index de modales

| Capa | z-index |
|------|---------|
| Modal estándar | `z-[100]` |
| Modal sobre modal / visor PDF | `z-[110]` |

### Modal de visor de documento fullscreen

```html
<div class="fixed inset-0 z-[110] flex flex-col bg-slate-900/95 backdrop-blur-sm animate-in fade-in">
  <!-- Toolbar -->
  <div class="flex items-center justify-between px-6 py-3 bg-[#1e3a8a] shadow-lg flex-shrink-0">
    <!-- acciones -->
  </div>
  <!-- Contenido -->
  <div class="flex-1 relative">
    <iframe class="w-full h-full border-0 bg-white"></iframe>
  </div>
</div>
```

---

## 13. Animaciones

Definidas en el CSS del módulo. Usar siempre `animate-in` + modificador:

```css
.animate-in { animation: animateIn 0.3s ease-out forwards; }
.fade-in { opacity: 0; }
.slide-in-from-bottom-4 { transform: translateY(1rem); }
.slide-in-from-right-4 { transform: translateX(1rem); }

@keyframes animateIn {
  to { opacity: 1; transform: translate(0); }
}
```

| Caso de uso | Clases |
|-------------|--------|
| Card de paso que aparece | `animate-in fade-in slide-in-from-bottom-4` |
| Paso siguiente (avance) | `animate-in fade-in slide-in-from-right-4` |
| Modal / overlay | `animate-in fade-in` |
| Elemento inline que aparece | `animate-in fade-in` |

---

## 14. Scrollbar personalizado

```css
.custom-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
.custom-scroll::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 4px; }
.custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
.custom-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
```

Usar clase `custom-scroll` en cualquier contenedor con `overflow-y-auto` o `overflow-x-auto`.

---

## 15. Focus global de inputs

```css
input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #1e3a8a;
  box-shadow: 0 0 0 1px #1e3a8a;
}
```

---

## 16. Spinner de carga

```html
<!-- Inline en botón -->
<span class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>

<!-- Centrado en contenedor -->
<span class="animate-spin h-12 w-12 border-4 border-[#3b82f6] border-t-transparent rounded-full"></span>

<!-- ngx-spinner (step 3 / catálogo) -->
<ngx-spinner
  name="nombre-spinner"
  bdColor="rgba(30, 58, 138, 0.15)"
  size="medium"
  color="#1e3a8a"
  type="ball-clip-rotate"
  [fullScreen]="true"
>
  <p class="text-white text-sm font-medium mt-3">Cargando...</p>
</ngx-spinner>
```

---

## 17. Notas / alertas informativas

```html
<div class="bg-slate-50 border border-slate-200 rounded p-4">
  <p class="text-[11px] font-bold text-slate-800 mb-2">ⓘ Notas Importantes:</p>
  <ul class="list-decimal pl-4 space-y-1">
    <li class="text-[11px] text-slate-600 leading-tight">Nota aquí</li>
  </ul>
</div>
```

---

## 18. Lista con bullets institucionales

```html
<ul class="space-y-3">
  <li class="flex gap-2 text-sm text-slate-700">
    <span class="mt-1 shrink-0 w-2 h-2 rounded-full bg-[#1e3a8a]"></span>
    <span>Texto del item</span>
  </li>
</ul>
```

---

## 19. Empty state (sin datos)

```html
<!-- En tabla -->
<tr>
  <td colspan="N" class="p-10 text-slate-400 italic text-center">No hay registros.</td>
</tr>

<!-- En lista / contenedor -->
<p class="text-slate-400 text-xs text-center py-3 border border-dashed border-slate-300 rounded">
  No hay elementos registrados aún.
</p>
```

---

## 20. Responsive

| Breakpoint | Comportamiento |
|------------|----------------|
| `md:` (768px) | Activar grids de múltiples columnas |
| Mobile-first | Siempre `grid-cols-1` base, `md:grid-cols-2` o `md:grid-cols-3` en desktop |
| Tablas anchas | `overflow-x-auto custom-scroll` + `min-w-[700px]` en el grid interno |
| Modales | `w-full max-w-xl mx-4` — adaptan al viewport con padding `p-4` en el overlay |
| Flex stacks | `flex-col md:flex-row` para cards de resumen |

---

## 21. Reglas de consistencia obligatorias

1. **`type="button"`** en todo `<button>` dentro de un `<form>`.
2. **`font-bold`** máximo en interfaces — nunca `font-extrabold` ni `font-black`.
3. **Labels siempre en `uppercase`** con `text-[11px]`.
4. **Separadores de sección** con `border-t border-slate-300` + `pt-4`.
5. **Cabeceras de modal** con `px-6 py-4` / footers con `px-6 py-3`.
6. **`custom-scroll`** en todo contenedor scrollable visible al usuario.
7. **`app-page-header`** obligatorio en todos los módulos principales.
8. **Animaciones de entrada** en cada tarjeta de paso o vista principal.
9. **`focus:border-[#1e3a8a]`** en todos los inputs — sin `outline` nativo.
10. **Semántica de headings correcta**: `PageHeader` usa `h2`, pasos internos `h3`, secciones `h4`. No usar `h1` para títulos de formulario.
