import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormularios } from './admin-formularios';

describe('AdminFormularios', () => {
  let component: AdminFormularios;
  let fixture: ComponentFixture<AdminFormularios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFormularios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFormularios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
