import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestProfessorComponent } from './view-test-professor.component';

describe('ViewTestProfessorComponent', () => {
  let component: ViewTestProfessorComponent;
  let fixture: ComponentFixture<ViewTestProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTestProfessorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTestProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
