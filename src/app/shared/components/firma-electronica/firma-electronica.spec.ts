import '@angular/compiler';
import { describe, expect, it, vi } from 'vitest';

vi.mock('pdfjs-dist', () => ({
  GlobalWorkerOptions: {},
  getDocument: vi.fn(),
}));

import { FirmaElectronicaComponent } from './firma-electronica';

describe('FirmaElectronicaComponent', () => {
  it('solo permite que la última página solicitada pinte el canvas', async () => {
    vi.stubGlobal('window', { devicePixelRatio: 1 });
    let resolverPagina2!: (pagina: any) => void;

    const tareaPagina3 = {
      promise: Promise.resolve(),
      cancel: vi.fn(),
    };
    const pagina2 = crearPagina();
    const pagina3 = crearPagina(tareaPagina3);
    const documento = {
      getPage: vi.fn((numero: number) => {
        if (numero === 2) {
          return new Promise((resolve) => {
            resolverPagina2 = resolve;
          });
        }
        return Promise.resolve(pagina3);
      }),
    };

    const componente = new FirmaElectronicaComponent(
      {} as any,
      { run: (accion: () => void) => accion() } as any,
    );
    const canvas = crearCanvas();
    prepararDocumentoCanvas();

    Object.assign(componente as any, {
      pdfDocument: documento,
      pdfCanvas: { nativeElement: canvas },
      visorPdf: { nativeElement: { clientWidth: 636 } },
    });

    componente.paginaActual = 2;
    const renderPagina2 = componente.renderizarPagina();

    // Deja que la primera llamada quede esperando getPage(2).
    await Promise.resolve();
    await Promise.resolve();

    componente.paginaActual = 3;
    const renderPagina3 = componente.renderizarPagina();
    resolverPagina2(pagina2);

    await Promise.all([renderPagina2, renderPagina3]);

    expect(pagina2.render).not.toHaveBeenCalled();
    expect(pagina3.render).toHaveBeenCalledOnce();
    expect(documento.getPage).toHaveBeenCalledWith(2);
    expect(documento.getPage).toHaveBeenCalledWith(3);
  });

  it('termina de cargar normalmente al cambiar de la página 1 a la 2', async () => {
    vi.stubGlobal('window', { devicePixelRatio: 1 });

    const pagina1 = crearPagina();
    const pagina2 = crearPagina();
    const documento = {
      getPage: vi.fn((numero: number) => Promise.resolve(numero === 1 ? pagina1 : pagina2)),
    };
    const componente = crearComponente(documento);
    prepararDocumentoCanvas();

    componente.paginaActual = 1;
    await componente.renderizarPagina();

    expect((componente as any).renderTask).toBeNull();
    expect(componente.renderizandoPagina).toBe(false);

    componente.cambiarPagina(1);
    await vi.waitFor(() => {
      expect(componente.renderizandoPagina).toBe(false);
      expect(pagina2.render).toHaveBeenCalledOnce();
    });

    expect(componente.paginaActual).toBe(2);
    expect((componente as any).renderTask).toBeNull();
  });
});

function crearPagina(tarea = { promise: Promise.resolve(), cancel: vi.fn() }) {
  return {
    getViewport: vi.fn(({ scale }: { scale: number }) => ({
      width: 600 * scale,
      height: 800 * scale,
      scale,
      convertToViewportPoint: vi.fn(),
      convertToPdfPoint: vi.fn(),
    })),
    render: vi.fn().mockReturnValue(tarea),
  };
}

function crearComponente(documento: any): FirmaElectronicaComponent {
  const componente = new FirmaElectronicaComponent(
    {} as any,
    { run: (accion: () => void) => accion() } as any,
  );
  const canvas = crearCanvas();

  Object.assign(componente as any, {
    pdfDocument: documento,
    pdfCanvas: { nativeElement: canvas },
    visorPdf: { nativeElement: { clientWidth: 636 } },
  });
  componente.totalPaginas = 2;

  return componente;
}

function prepararDocumentoCanvas(): void {
  vi.stubGlobal('document', {
    baseURI: 'http://localhost/',
    visibilityState: 'visible',
    createElement: vi.fn(() => crearCanvas()),
  });
}

function crearCanvas() {
  return {
    width: 0,
    height: 0,
    style: { width: '', height: '' },
    getContext: vi.fn().mockReturnValue({
      clearRect: vi.fn(),
      drawImage: vi.fn(),
    }),
  };
}
