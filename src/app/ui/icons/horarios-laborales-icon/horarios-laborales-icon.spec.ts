import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosLaboralesIcon } from './horarios-laborales-icon';

describe('HorariosLaboralesIcon', () => {
  let component: HorariosLaboralesIcon;
  let fixture: ComponentFixture<HorariosLaboralesIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorariosLaboralesIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorariosLaboralesIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
