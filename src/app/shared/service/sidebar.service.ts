import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  isOpen = signal(true);
  mobileOpen = signal(false);

  toggle() {
    this.isOpen.update(val => !val);
  }

  toggleMobile() {
    this.mobileOpen.update(val => !val);
  }

  closeMobile() {
    this.mobileOpen.set(false);
  }
}
