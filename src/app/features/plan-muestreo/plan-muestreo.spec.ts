import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanMuestreo } from './plan-muestreo';

describe('PlanMuestreo', () => {
  let component: PlanMuestreo;
  let fixture: ComponentFixture<PlanMuestreo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanMuestreo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanMuestreo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
