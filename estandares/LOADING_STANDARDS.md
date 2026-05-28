# Estándar: Componente de Loading

## Componente

**Ruta:** `src/app/shared/components/loading/loading.ts`
**Selector:** `<app-loading />`

Muestra un spinner centrado dentro del contenedor donde se coloque. No tiene inputs — es puro visual.

---

## Cómo importarlo

En el `.ts` del componente que lo use:

```typescript
import { LoadingComponent } from '../../shared/components/loading/loading';

@Component({
  imports: [..., LoadingComponent],
})
```

> Ajusta la ruta relativa según la ubicación del componente.

---

## Patrones de uso

### 1. Loading dentro de una card (formulario o tabla)

El header/título de la card siempre visible. El spinner reemplaza el contenido mientras carga.

```html
<div class="max-w-7xl mx-auto bg-white p-8 rounded shadow-sm border border-slate-200">

  <!-- Cabecera siempre visible -->
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

---

### 2. Loading que oculta múltiples secciones

Cuando el loading debe afectar a más de una card (ej. formulario + tabla inferior):

```html
<!-- Card principal: header siempre visible, contenido condicional -->
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

<!-- Sección secundaria: oculta hasta que cargue -->
@if (!loading) {
  <div class="max-w-7xl mx-auto bg-white rounded shadow-sm border border-slate-200">
    <!-- tabla u otro contenido -->
  </div>
}
```

---

### 3. Loading en lista/tabla (sin card de formulario)

Patrón usado en `admin-formularios` y `formulario-detalle`:

```html
@if (loading) {
  <app-loading />
} @else {
  <div class="border border-slate-200 rounded">
    <table>...</table>
  </div>
}
```

---

## Reglas

| Regla | Detalle |
|---|---|
| No mostrar contenido vacío mientras carga | Usar `@if (loading)` para ocultar listas/tablas |
| El header estático puede quedar visible | Título, breadcrumb, metadata del formulario |
| No agregar texto al spinner | El componente no tiene `message` — solo el spinner |
| Siempre usar `loading = true` al iniciar y `false` en `next` y `error` | Para que el spinner no se quede pegado |

---

## Estado en el componente `.ts`

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
      // mostrar error al usuario
    },
  });
}
```

---

## Ejemplos reales en el proyecto

| Componente | Patrón |
|---|---|
| `horarios-laborales` | Header visible + form condicional + cronograma condicional |
| `formulario-detalle` | Loading dentro de card, tabla condicional |
| `admin-formularios` | Loading dentro de card, lista condicional |
