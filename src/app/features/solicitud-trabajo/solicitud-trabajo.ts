import { Component, OnInit, NgZone, AfterViewChecked, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import * as L from 'leaflet';
import { Pregunta } from './model/solicitud-trabajo.model';
import { SolicitudService } from './service/solicitud-trabajo-service';
import { AuthService } from '../auth/service/auth-service';

@Component({
  selector: 'app-solicitud-trabajo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitud-trabajo.html',
  styleUrls: ['./solicitud-trabajo.css'],
})
export class SolicitudTrabajo implements OnInit, AfterViewChecked, OnDestroy {
  form: FormGroup;
  preguntas: Pregunta[] = [];
  loading = true;
  showMapModal = false;

  private map: any;
  private marker: any;
  private destroy$ = new Subject<void>(); // Para gestionar la destrucción de suscripciones

  constructor(
    private fb: FormBuilder,
    private service: SolicitudService,
    private authService: AuthService,
    private zone: NgZone,
  ) {
    // Inicialización de campos base (Login + Coordenadas)
    this.form = this.fb.group({
      val_lati: ['', [Validators.required]],
      val_long: ['', [Validators.required]],
      jefatura_display: [{ value: '', disabled: true }],
      solicitado_por: [{ value: '', disabled: true }],
      cargo_usuario: [{ value: '', disabled: true }],
    });
  }

  ngOnInit() {
    this.service
      .getFormulario()
      .pipe(takeUntil(this.destroy$)) // Evita fugas de memoria
      .subscribe({
        next: (preguntas) => {
          this.preguntas = preguntas;
          this.generateControls();
          this.setUserDataFromLogin();
          this.initDependencyLogic();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar formulario', err);
          this.loading = false;
        },
      });
  }

  private setUserDataFromLogin() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.form.patchValue({
        jefatura_display: user.jefatura || 'N/A',
        solicitado_por: user.name || 'Usuario',
        cargo_usuario: user.cargo || 'N/A',
      });
    }
  }

  private generateControls() {
    this.preguntas.forEach((p) => {
      if (!this.form.contains(p.nombre)) {
        const validators = this.getValidators(p);
        this.form.addControl(
          p.nombre,
          this.fb.control({ value: '', disabled: p.readonly }, validators),
        );
      }
    });
  }

  private getValidators(p: Pregunta) {
    const validators = [];
    if (p.obligatorio) validators.push(Validators.required);
    if (p.num_caracter) validators.push(Validators.maxLength(p.num_caracter));
    return validators;
  }

  private initDependencyLogic() {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$)) // Limpieza automática
      .subscribe(() => {
        this.preguntas.forEach((p) => {
          if (p.atributo_id) {
            const padre = this.preguntas.find((orig) => orig.id === p.atributo_id);
            if (padre) {
              const valorPadre = this.form.get(padre.nombre)?.value;
              const isVisible = valorPadre?.toString() === p.item_catalogo_id;

              // Si el estado de visibilidad cambia, actualizamos
              if (p.hidden !== !isVisible) {
                p.hidden = !isVisible;
                // Si se oculta, opcionalmente podrías limpiar el valor
                if (p.hidden) this.form.get(p.nombre)?.reset('', { emitEvent: false });
              }
            }
          }
        });
      });
  }

  // Getters segmentados (Para el @for en el HTML)
  get questionsPart1() {
    return this.preguntas.filter((p) => p.orden <= 1);
  }
  get questionsPart2() {
    return this.preguntas.filter(
      (p) => p.orden >= 2 && p.orden <= 12 && p.nombre !== 'val_lati' && p.nombre !== 'val_long',
    );
  }
  get questionsPart3() {
    return this.preguntas.filter((p) => p.orden >= 13);
  }

  // --- Lógica de Mapa ---
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

  ngAfterViewChecked() {
    if (this.showMapModal && !this.map) {
      this.initMap();
    }
  }

  private initMap() {
    this.zone.runOutsideAngular(() => {
      this.map = L.map('map-container').setView([-0.1807, -78.4678], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
      this.marker = L.marker([-0.1807, -78.4678], { draggable: true }).addTo(this.map);

      this.marker.on('dragend', () => {
        const position = this.marker.getLatLng();
        this.updateCoords(position.lat, position.lng);
      });

      this.map.on('click', (e: any) => {
        this.marker.setLatLng(e.latlng);
        this.updateCoords(e.latlng.lat, e.latlng.lng);
      });

      setTimeout(() => this.map.invalidateSize(), 250);
    });
  }

  updateCoords(lat: number, lng: number) {
    this.zone.run(() => {
      this.form.patchValue({
        val_lati: lat.toFixed(6) + ' E',
        val_long: lng.toFixed(6) + ' N',
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
