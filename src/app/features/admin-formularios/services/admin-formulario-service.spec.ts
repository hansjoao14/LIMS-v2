import { TestBed } from '@angular/core/testing';

import { AdminFormularioService } from './admin-formulario-service';

describe('AdminFormularioService', () => {
  let service: AdminFormularioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFormularioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
