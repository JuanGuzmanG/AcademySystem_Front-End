import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule,Location } from '@angular/common';
import Swal from 'sweetalert2';

import { QuestionService } from '../../../services/question.service';
import { materialImports } from '../../../material.imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Question } from '../../../interfaces/Question.interface';

@Component({
  selector: 'app-add-question-professor',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './add-question-professor.component.html',
  styleUrl: './add-question-professor.component.css'
})
export class AddQuestionProfessorComponent implements OnInit, OnDestroy {
  testId: string | null = null;
  testName: string | null = null;

  questionForm!: FormGroup;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute = inject(ActivatedRoute),
    private readonly questionService: QuestionService = inject(QuestionService),
    private readonly router: Router = inject(Router),
    private readonly fb: FormBuilder = inject(FormBuilder),
    private readonly location: Location = inject(Location)
  ) {}

  ngOnInit(): void {
    this.testId = this.route.snapshot.params['testId'];
    this.testName = this.route.snapshot.params['testName'];

    this.questionForm = this.fb.group({
      questionContent: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
      correctOption: ['', Validators.required],
      imageQuestion: [null],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    if (this.questionForm.invalid) {
      Swal.fire('Error', 'Please fill all the fields', 'error');
      return;
    }
    const newQuestion: Question = {
      ...this.questionForm.value,
      test: { testId: this.testId }, 
      questionContent: '¿' + this.questionForm.value.questionContent + '?',
    };

    this.questionService.addQuestion(newQuestion).subscribe({
      next: () => {
        this.questionForm.reset();
        this.questionForm.get('test')?.patchValue({ testId: this.testId });
        this.router.navigate(['/professor/questions', this.testName, this.testId]);
      },
      error: (err) => {
        console.error('Error adding question:', err);
      },
    });
  }
}

