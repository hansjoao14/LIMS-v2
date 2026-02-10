import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSidebarIconComponent } from './open-sidebar-icon.component';

describe('OpenSidebarIconComponent', () => {
  let component: OpenSidebarIconComponent;
  let fixture: ComponentFixture<OpenSidebarIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenSidebarIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenSidebarIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
