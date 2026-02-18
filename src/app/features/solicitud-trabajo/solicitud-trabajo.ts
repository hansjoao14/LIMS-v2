import { Component, AfterViewChecked, NgZone } from '@angular/core';
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
  private map: any;
  private marker: any;

  headerData = {
    elaboradoPor: 'Tec. Jorge Diaz',
    fechaSolicitud: '27/05/2025',
    numeroSolicitud: 'ST-2025-001'
  };

  constructor(private fb: FormBuilder, private zone: NgZone) {
    this.solicitudForm = this.fb.group({
      jefatura: ['', Validators.required],
      solicitadoPor: ['', Validators.required],
      ruc: ['', Validators.required],
      razonSocial: ['', Validators.required],
      nombreComercial: [''],
      direccion: ['', Validators.required],
      latitud: ['0672650 E'],
      longitud: ['9962200 N'],
      horarios: ['2025-06-03'],
      motivo: ['', Validators.required],
      observaciones: ['', [Validators.maxLength(250)]]
    });
  }

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
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  private initMap(): void {
    this.zone.runOutsideAngular(() => {
      // Coordenadas iniciales para Quito
      this.map = L.map('map-container').setView([-0.1807, -78.4678], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(this.map);

      // Icono personalizado para el pin (Opcional)
      this.marker = L.marker([-0.1807, -78.4678], { draggable: true }).addTo(this.map);

      // Forzar renderizado
      setTimeout(() => this.map.invalidateSize(), 200);

      this.map.on('click', (e: any) => {
        this.marker.setLatLng(e.latlng);
        this.updateCoords(e.latlng.lat, e.latlng.lng);
      });
    });
  }

  updateCoords(lat: number, lng: number) {
    this.zone.run(() => {
      this.solicitudForm.patchValue({
        latitud: lat.toFixed(6) + ' E',
        longitud: lng.toFixed(6) + ' N'
      });
    });
  }

  confirmLocation() {
    this.closeMap();
  }
}