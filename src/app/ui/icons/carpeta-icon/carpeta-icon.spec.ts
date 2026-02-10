import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpetaIcon } from './carpeta-icon';

describe('CarpetaIcon', () => {
  let component: CarpetaIcon;
  let fixture: ComponentFixture<CarpetaIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarpetaIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarpetaIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
