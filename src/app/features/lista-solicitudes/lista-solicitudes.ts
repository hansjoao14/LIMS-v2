import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

interface SolicitudFirma {
  id: string;
  nombreFormulario: string;
  firmado: boolean;
}

@Component({
  selector: 'app-lista-solicitudes',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './lista-solicitudes.html',
  styleUrls: ['./lista-solicitudes.css'],
})
export class ListaSolicitudes {

  // --- VARIABLES DE ESTADO ---
  viewingSignature: boolean = false;
  selectedDoc: SolicitudFirma | null = null;

  // Variables del formulario de firma
  archivoFirma: File | null = null;
  claveFirma: string = '';
  isFirmando: boolean = false;

  readonly COLOR_PRIMARIO = '#1d2b64';
  fechaActual = new Date();

  // --- DATOS MOCKEADOS (Basados en tu imagen) ---
  solicitudes: SolicitudFirma[] = [
    { id: 'ST-2025-001', nombreFormulario: 'SOLICITUD DE TRABAJO DE ENSAYOS', firmado: true },
    { id: 'ST-2025-002', nombreFormulario: 'SOLICITUD DE TRABAJO DE ENSAYOS', firmado: false },
    { id: 'ST-2025-003', nombreFormulario: 'SOLICITUD DE TRABAJO DE ENSAYOS', firmado: true },
    { id: 'ST-2025-004', nombreFormulario: 'SOLICITUD DE TRABAJO DE ENSAYOS', firmado: false },
    { id: 'ST-2025-005', nombreFormulario: 'SOLICITUD DE TRABAJO DE ENSAYOS', firmado: false },
  ];

  // --- MÉTODOS DE LA LISTA ---
  abrirPanelFirma(doc: SolicitudFirma) {
    this.selectedDoc = doc;
    this.archivoFirma = null;
    this.claveFirma = '';
    this.viewingSignature = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- MÉTODOS DEL PANEL DE FIRMA ---
  regresarLista() {
    this.viewingSignature = false;
    this.selectedDoc = null;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.name.toLowerCase().endsWith('.p12')) {
        this.archivoFirma = file;
      } else {
        Swal.fire({
          title: 'Archivo no válido',
          text: 'Solo se aceptan certificados digitales en formato .p12',
          icon: 'warning',
          confirmButtonColor: this.COLOR_PRIMARIO
        });
        input.value = ''; 
        this.archivoFirma = null;
      }
    }
  }

  ejecutarFirma() {
    if (!this.archivoFirma || !this.claveFirma) {
      Swal.fire({
        title: 'Datos Incompletos',
        text: 'Por favor cargue su certificado .p12 e ingrese la contraseña para firmar.',
        icon: 'warning',
        confirmButtonColor: this.COLOR_PRIMARIO
      });
      return;
    }

    this.isFirmando = true;

    // Simulamos un delay de red y proceso de firma
    setTimeout(() => {
      this.isFirmando = false;
      
      // Marcamos el documento como firmado en la lista
      if (this.selectedDoc) {
        this.selectedDoc.firmado = true;
      }

      Swal.fire({
        title: '¡Documento Firmado!',
        text: `El documento ${this.selectedDoc?.id} ha sido firmado electrónicamente con éxito.`,
        icon: 'success',
        confirmButtonColor: this.COLOR_PRIMARIO,
        timer: 3000
      }).then(() => {
        // Regresamos a la lista automáticamente
        this.regresarLista();
      });

    }, 1500);
  }
}