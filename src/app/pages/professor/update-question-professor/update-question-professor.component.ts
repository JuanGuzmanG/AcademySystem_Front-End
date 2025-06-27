import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule,Location } from '@angular/common';

import { QuestionService } from '../../../services/question.service';
import { materialImports } from '../../../material.imports';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-update-question-professor',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './update-question-professor.component.html',
  styleUrl: './update-question-professor.component.css'
})
export class UpdateQuestionProfessorComponent implements OnInit , OnDestroy {
  testId: '' | null = null;
  questionId: any;
  testName: '' | null = null;
  question: any = {};

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute = inject(ActivatedRoute),
    private readonly router: Router = inject(Router),
    private readonly questionService: QuestionService = inject(QuestionService),
    private readonly location: Location = inject(Location)
  ) {}

  ngOnInit(): void {
    this.testId = this.route.snapshot.params['testId'];
    this.questionId = this.route.snapshot.params['questionId'];
    this.testName = this.route.snapshot.params['testName'];
    this.questionService
    .getQuestion(this.questionId)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (question) => {
        this.question = question;
      },
      error: (error) => {
        console.error('Error fetching question:', error);
        this.router.navigate([
          '/admin/questions/' + this.testName + '/' + this.testId,
        ]);
      },
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
    this.questionService
    .updateQuestion(this.question)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: () => {
        this.router.navigate([
          '/professor/questions/' + this.testName + '/' + this.testId,
        ]);
      },
      error: (error) => {
        console.error('Error updating question:', error);
      },
    });
  }
}
