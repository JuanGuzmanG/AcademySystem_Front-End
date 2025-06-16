import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { materialImports } from '../../../material.imports';
import { QuestionService } from '../../../services/question.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private route: ActivatedRoute = inject(ActivatedRoute),
    private questionService: QuestionService = inject(QuestionService),
    private router: Router = inject(Router),
    private fb: FormBuilder = inject(FormBuilder)
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

  onSubmit() {
    if (this.questionForm.invalid) {
      Swal.fire('Error', 'Please fill all the fields', 'error');
      return;
    }
    const newQuestion: Question = {
      ...this.questionForm.value,
      test: { idTest: this.idTest }, // Assign the test ID
      contentQuestion: '¿' + this.questionForm.value.contentQuestion + '?', // Add question marks
    };

    this.questionService.addQuestion(newQuestion).subscribe({
      next: () => {
        this.questionForm.reset();
        this.questionForm.get('test')?.patchValue({ idTest: this.idTest }); // Re-set test ID if needed
        this.router.navigate(['/admin/questions', this.testName, this.idTest]);
      },
      error: (err) => {
        console.error('Error adding question:', err);
      },
    });
  }
  
}
