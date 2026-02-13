import { Component, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-solicitud-trabajo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitud-trabajo.html',
  styleUrl: './solicitud-trabajo.css',
})
export class SolicitudTrabajo implements AfterViewChecked {
  solicitudForm: FormGroup;
  showMapModal = false;
  
  // Configuración de Leaflet
  private map: any;
  private marker: any;
  // Coordenadas por defecto (Quito, Ecuador)
  private defaultCoords: L.LatLngExpression = [-0.1807, -78.4678];

  headerData = {
    elaboradoPor: 'Tec. Jorge Diaz',
    fechaSolicitud: '27/05/2025',
    numeroSolicitud: 'ST-2025-001'
  };

  constructor(private fb: FormBuilder) {
    this.solicitudForm = this.fb.group({
      jefatura: ['', Validators.required],
      solicitadoPor: ['', Validators.required],
      ruc: ['', Validators.required],
      razonSocial: ['', Validators.required],
      nombreComercial: [''],
      direccion: ['', Validators.required],
      latitud: ['-0.1807'],
      longitud: ['-78.4678'],
      horarios: [''],
      motivo: ['', Validators.required],
      observaciones: ['', [Validators.maxLength(250)]]
    });
  }

  // Se usa AfterViewChecked para asegurar que el div del mapa exista antes de inicializarlo
  ngAfterViewChecked() {
    if (this.showMapModal && !this.map) {
      this.initMap();
    }
  }

  openMap() {
    this.showMapModal = true;
  }

  closeMap() {
    this.showMapModal = false;
    this.map = null; // Destruimos la referencia para poder reinicializarlo
  }

  private initMap(): void {
    const lat = parseFloat(this.solicitudForm.value.latitud) || -0.1807;
    const lng = parseFloat(this.solicitudForm.value.longitud) || -78.4678;

    this.map = L.map('map-container').setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Marcador interactivo
    this.marker = L.marker([lat, lng], { draggable: true }).addTo(this.map);

    this.marker.on('dragend', () => {
      const pos = this.marker.getLatLng();
      this.updateCoords(pos.lat, pos.lng);
    });

    this.map.on('click', (e: any) => {
      this.marker.setLatLng(e.latlng);
      this.updateCoords(e.latlng.lat, e.latlng.lng);
    });
  }

  updateCoords(lat: number, lng: number) {
    this.solicitudForm.patchValue({
      latitud: lat.toFixed(6),
      longitud: lng.toFixed(6)
    });
  }

  confirmLocation() {
    this.closeMap();
  }

  jornadas = [
    { nombre: 'Lunes', abreviacion: 'LU', activo: false },
    { nombre: 'Martes', abreviacion: 'MA', activo: true }, // Por defecto como en la imagen
    { nombre: 'Miércoles', abreviacion: 'MI', activo: false },
    { nombre: 'Jueves', abreviacion: 'JU', activo: false },
    { nombre: 'Viernes', abreviacion: 'VI', activo: false },
  ];

  seleccionarJornada(jornada: any) {
    this.jornadas.forEach(j => j.activo = false);
    jornada.activo = true;
    this.solicitudForm.patchValue({ horarios: jornada.nombre });
  }

}