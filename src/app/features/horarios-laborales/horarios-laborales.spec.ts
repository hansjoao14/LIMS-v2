import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosLaborales } from './horarios-laborales';

describe('HorariosLaborales', () => {
  let component: HorariosLaborales;
  let fixture: ComponentFixture<HorariosLaborales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorariosLaborales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorariosLaborales);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
