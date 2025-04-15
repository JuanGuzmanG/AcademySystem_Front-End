import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarProfessorComponent } from './sidebar-professor.component';

describe('SidebarProfessorComponent', () => {
  let component: SidebarProfessorComponent;
  let fixture: ComponentFixture<SidebarProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarProfessorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
