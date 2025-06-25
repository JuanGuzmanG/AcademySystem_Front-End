import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule,Location } from '@angular/common';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

import { materialImports } from '../../../material.imports';
import { QuestionService } from '../../../services/question.service';
import { Question } from '../../../interfaces/Question.interface';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css',
})
export class AddQuestionComponent implements OnInit, OnDestroy {
  idTest: string | null = null;
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
    this.idTest = this.route.snapshot.params['idTest'];
    this.testName = this.route.snapshot.params['testName'];

    this.questionForm = this.fb.group({
      contentQuestion: ['', Validators.required],
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
      test: { idTest: this.idTest }, 
      contentQuestion: '¿' + this.questionForm.value.contentQuestion + '?',
    };

    this.questionService.addQuestion(newQuestion).subscribe({
      next: () => {
        this.questionForm.reset();
        this.questionForm.get('test')?.patchValue({ idTest: this.idTest });
        this.router.navigate(['/admin/questions', this.testName, this.idTest]);
      },
      error: (err) => {
        console.error('Error adding question:', err);
      },
    });
  }
}
