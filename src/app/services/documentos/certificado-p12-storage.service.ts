import { Injectable } from '@angular/core';

import { CertificadoP12Guardado } from '../../interfaces/documentos/certificado-p12.interface';

/**
 * Guarda el certificado .p12 en el navegador de quien firma, para no obligarlo
 * a buscar el archivo en cada documento.
 *
 * Va en IndexedDB y no en localStorage porque un .p12 en Base64 pesa cientos de
 * KB y localStorage tiene ~5 MB para todo el origen; además IndexedDB es
 * asíncrono y no bloquea el hilo principal al leerlo.
 *
 * **La contraseña NO se guarda, nunca.** El .p12 sin su clave no sirve para
 * firmar, así que lo que queda en el navegador es inútil por sí solo: es la
 * misma idea que dejar la llave en un cajón pero llevarse la combinación. La
 * contraseña se pide en cada firma y solo vive en memoria durante la petición.
 */
@Injectable({ providedIn: 'root' })
export class CertificadoP12StorageService {
  private readonly nombreBaseDatos = 'lims-firma-electronica';
  private readonly version = 1;
  private readonly almacen = 'certificados-p12';

  /** Un solo certificado por navegador: el de quien lo está usando. */
  private readonly certificadoId = 'certificado-principal';

  async guardar(nombre: string, base64: string): Promise<void> {
    const db = await this.abrir();

    const certificado: CertificadoP12Guardado = {
      id: this.certificadoId,
      nombre,
      base64,
      guardadoEn: new Date().toISOString(),
    };

    try {
      await this.enTransaccion(db, 'readwrite', (store) => store.put(certificado));
    } finally {
      db.close();
    }
  }

  async obtener(): Promise<CertificadoP12Guardado | null> {
    const db = await this.abrir();

    try {
      const resultado = await this.enTransaccion(db, 'readonly', (store) =>
        store.get(this.certificadoId),
      );
      return (resultado as CertificadoP12Guardado) ?? null;
    } finally {
      db.close();
    }
  }

  async eliminar(): Promise<void> {
    const db = await this.abrir();

    try {
      await this.enTransaccion(db, 'readwrite', (store) => store.delete(this.certificadoId));
    } finally {
      db.close();
    }
  }

  private abrir(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const peticion = indexedDB.open(this.nombreBaseDatos, this.version);

      peticion.onupgradeneeded = () => {
        const db = peticion.result;
        if (!db.objectStoreNames.contains(this.almacen)) {
          db.createObjectStore(this.almacen, { keyPath: 'id' });
        }
      };

      peticion.onsuccess = () => resolve(peticion.result);
      peticion.onerror = () =>
        reject(peticion.error ?? new Error('No se pudo abrir el almacén del navegador.'));
    });
  }

  /**
   * Envuelve una operación de IndexedDB en su transacción.
   *
   * Se espera al `oncomplete` de la transacción y no al `onsuccess` de la
   * petición: en una escritura, `onsuccess` dispara antes de que la transacción
   * confirme, así que resolver ahí puede dar por guardado algo que después se
   * aborta.
   */
  private enTransaccion<T>(
    db: IDBDatabase,
    modo: IDBTransactionMode,
    operacion: (store: IDBObjectStore) => IDBRequest<T>,
  ): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      const transaccion = db.transaction(this.almacen, modo);
      const peticion = operacion(transaccion.objectStore(this.almacen));

      let resultado: T | undefined;
      peticion.onsuccess = () => (resultado = peticion.result);

      transaccion.oncomplete = () => resolve(resultado);
      transaccion.onerror = () =>
        reject(transaccion.error ?? new Error('Falló la operación sobre el certificado.'));
      transaccion.onabort = () =>
        reject(transaccion.error ?? new Error('Se canceló la operación sobre el certificado.'));
    });
  }
}
