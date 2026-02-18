import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSolicitudesIcon } from './lista-solicitudes-icon';

describe('ListaSolicitudesIcon', () => {
  let component: ListaSolicitudesIcon;
  let fixture: ComponentFixture<ListaSolicitudesIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaSolicitudesIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSolicitudesIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
