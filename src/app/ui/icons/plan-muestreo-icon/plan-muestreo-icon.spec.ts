import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanMuestreoIcon } from './plan-muestreo-icon';

describe('PlanMuestreoIcon', () => {
  let component: PlanMuestreoIcon;
  let fixture: ComponentFixture<PlanMuestreoIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanMuestreoIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanMuestreoIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
