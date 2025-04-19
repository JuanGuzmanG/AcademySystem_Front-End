import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionProfessorComponent } from './add-question-professor.component';

describe('AddQuestionProfessorComponent', () => {
  let component: AddQuestionProfessorComponent;
  let fixture: ComponentFixture<AddQuestionProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddQuestionProfessorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuestionProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
