import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuestionProfessorComponent } from './update-question-professor.component';

describe('UpdateQuestionProfessorComponent', () => {
  let component: UpdateQuestionProfessorComponent;
  let fixture: ComponentFixture<UpdateQuestionProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateQuestionProfessorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateQuestionProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
