import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarIcon } from './car-icon';

describe('CarIcon', () => {
  let component: CarIcon;
  let fixture: ComponentFixture<CarIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
