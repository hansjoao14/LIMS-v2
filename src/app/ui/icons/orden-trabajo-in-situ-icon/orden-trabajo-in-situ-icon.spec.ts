import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenTrabajoInSituIcon } from './orden-trabajo-in-situ-icon';

describe('OrdenTrabajoInSituIcon', () => {
  let component: OrdenTrabajoInSituIcon;
  let fixture: ComponentFixture<OrdenTrabajoInSituIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenTrabajoInSituIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenTrabajoInSituIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
