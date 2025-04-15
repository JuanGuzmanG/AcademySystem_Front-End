import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestQuestionsProfessorComponent } from './view-test-questions-professor.component';

describe('ViewTestQuestionsProfessorComponent', () => {
  let component: ViewTestQuestionsProfessorComponent;
  let fixture: ComponentFixture<ViewTestQuestionsProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTestQuestionsProfessorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTestQuestionsProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
