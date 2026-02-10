import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseSidebarIconComponent } from './close-sidebar-icon.component';

describe('CloseSidebarIconComponent', () => {
  let component: CloseSidebarIconComponent;
  let fixture: ComponentFixture<CloseSidebarIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseSidebarIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseSidebarIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
