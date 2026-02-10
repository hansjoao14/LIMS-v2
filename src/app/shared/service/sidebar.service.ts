import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  // Usamos una Signal: true = Abierto, false = Cerrado
  isOpen = signal(true); 

  toggle() {
    this.isOpen.update(val => !val);
  }
}