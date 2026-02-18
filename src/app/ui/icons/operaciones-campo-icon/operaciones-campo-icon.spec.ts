import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionesCampoIcon } from './operaciones-campo-icon';

describe('OperacionesCampoIcon', () => {
  let component: OperacionesCampoIcon;
  let fixture: ComponentFixture<OperacionesCampoIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperacionesCampoIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperacionesCampoIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
