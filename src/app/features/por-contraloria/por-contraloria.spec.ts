import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorContraloria } from './por-contraloria';

describe('PorContraloria', () => {
  let component: PorContraloria;
  let fixture: ComponentFixture<PorContraloria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PorContraloria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorContraloria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
