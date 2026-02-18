import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenTrabajoInSitu } from './orden-trabajo-in-situ';

describe('OrdenTrabajoInSitu', () => {
  let component: OrdenTrabajoInSitu;
  let fixture: ComponentFixture<OrdenTrabajoInSitu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenTrabajoInSitu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenTrabajoInSitu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
