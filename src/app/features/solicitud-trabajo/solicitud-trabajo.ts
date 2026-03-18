import { Component, OnInit, NgZone, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import * as L from 'leaflet';
import { Pregunta } from './model/solicitud-trabajo.model';
import { SolicitudService } from './service/solicitud-trabajo-service';
import { AuthService } from '../auth/service/auth-service';

@Component({
  selector: 'app-solicitud-trabajo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitud-trabajo.html',
  styleUrls: ['./solicitud-trabajo.css']
})
export class SolicitudTrabajo implements OnInit, AfterViewChecked {
  form: FormGroup;
  preguntas: Pregunta[] = [];
  loading = true;
  showMapModal = false;
  
  private map: any;
  private marker: any;

  constructor(
    private fb: FormBuilder,
    private service: SolicitudService,
    private authService: AuthService,
    private zone: NgZone
  ) {
    // 1. Inicialización preventiva: Define los campos que el HTML busca antes de recibir el JSON
    this.form = this.fb.group({
      val_lati: ['', Validators.required],
      val_long: ['', Validators.required],
      jefatura_display: [{ value: '', disabled: true }], 
      solicitado_por: [{ value: '', disabled: true }],
      cargo_usuario: [{ value: '', disabled: true }]
    });
  }

  ngOnInit() {
    // 2. Carga la estructura del formulario desde el backend
    this.service.getFormulario().subscribe(preguntas => {
      this.preguntas = preguntas;
      
      this.generateControls();     // Crea controles dinámicos del JSON
      this.setUserDataFromLogin(); // Inyecta datos del usuario logueado
      this.initDependencyLogic();  // Activa lógica de campos ocultos
      
      this.loading = false;
    });
  }

  /**
   * Obtiene los datos de la sesión actual y los setea en los campos deshabilitados
   */
  private setUserDataFromLogin() {
    const user = this.authService.getCurrentUser(); 
    
    if (user) {
      this.form.patchValue({
        // 'user.name' y 'user.cargo' deben existir en tu interface UserData del AuthService
        jefatura_display: user.jefatura || 'N/A',
        solicitado_por: user.name || 'Usuario desconocido',
        cargo_usuario: user.cargo || 'N/A'
      });

      // Si el JSON del backend espera que envíes el ID de jefatura en un campo específico:
      if (this.form.contains('val_ct_jefatura')) {
        // Asumiendo que guardamos el ID en alguna propiedad del usuario o token
        this.form.get('val_ct_jefatura')?.setValue(user.jefatura); 
      }
    }
  }

  /**
   * Recorre el JSON y agrega al FormGroup los campos que no fueron creados manualmente
   */
  private generateControls() {
    this.preguntas.forEach(p => {
      if (!this.form.contains(p.nombre)) {
        const validators = [];
        if (p.obligatorio) validators.push(Validators.required);
        if (p.num_caracter) validators.push(Validators.maxLength(p.num_caracter));
        
        this.form.addControl(p.nombre, this.fb.control(
          { value: '', disabled: p.readonly }, 
          validators
        ));
      }
    });
  }

  /**
   * Maneja la visibilidad de preguntas dependiendo de la selección en otras
   */
  private initDependencyLogic() {
    this.form.valueChanges.subscribe(() => {
      this.preguntas.forEach(p => {
        if (p.atributo_id) {
          const padre = this.preguntas.find(orig => orig.id === p.atributo_id);
          if (padre) {
            const valorPadre = this.form.get(padre.nombre)?.value;
            p.hidden = !(valorPadre?.toString() === p.item_catalogo_id);
          }
        }
      });
    });
  }

  // --- Getters para el Layout (Figma) ---

  get questionsPart1() { 
    return this.preguntas.filter(p => p.orden <= 1); 
  }

  get questionsPart2() { 
    // Filtramos latitud y longitud porque se manejan manualmente en el bloque de coordenadas
    return this.preguntas.filter(p => 
      p.orden >= 2 && p.orden <= 12 && 
      p.nombre !== 'val_lati' && p.nombre !== 'val_long'
    ); 
  }

  get questionsPart3() { 
    return this.preguntas.filter(p => p.orden >= 13); 
  }

  // --- Lógica del Mapa (Leaflet) ---

  openMap() { this.showMapModal = true; }
  
  closeMap() { 
    this.showMapModal = false; 
    if (this.map) { 
      this.map.remove(); 
      this.map = null; 
    }
  }

  ngAfterViewChecked() {
    // Solo inicializa el mapa cuando el contenedor existe en el DOM (al abrir el modal)
    if (this.showMapModal && !this.map) {
      this.initMap();
    }
  }

  private initMap() {
    this.zone.runOutsideAngular(() => {
      // Centrado inicial en Quito
      this.map = L.map('map-container').setView([-0.1807, -78.4678], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(this.map);

      this.marker = L.marker([-0.1807, -78.4678], { draggable: true }).addTo(this.map);

      // Evento: Al soltar el marcador arrastrado
      this.marker.on('dragend', () => {
        const position = this.marker.getLatLng();
        this.updateCoords(position.lat, position.lng);
      });

      // Evento: Al hacer click en cualquier parte del mapa
      this.map.on('click', (e: any) => {
        this.marker.setLatLng(e.latlng);
        this.updateCoords(e.latlng.lat, e.latlng.lng);
      });

      // Forzar renderizado para evitar cuadros grises en Leaflet
      setTimeout(() => this.map.invalidateSize(), 250);
    });
  }

  /**
   * Setea los valores de latitud y longitud en el formulario
   */
  updateCoords(lat: number, lng: number) {
    this.zone.run(() => {
      this.form.patchValue({
        val_lati: lat.toFixed(6) + ' E',
        val_long: lng.toFixed(6) + ' N'
      });
      this.form.get('val_lati')?.markAsTouched();
      this.form.get('val_long')?.markAsTouched();
    });
  }
}