import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorContraloriaIcon } from './por-contraloria-icon';

describe('PorContraloriaIcon', () => {
  let component: PorContraloriaIcon;
  let fixture: ComponentFixture<PorContraloriaIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PorContraloriaIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorContraloriaIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
