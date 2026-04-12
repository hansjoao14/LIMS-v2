import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimsStepperComponent } from './lims-stepper-component';

describe('LimsStepperComponent', () => {
  let component: LimsStepperComponent;
  let fixture: ComponentFixture<LimsStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LimsStepperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LimsStepperComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
