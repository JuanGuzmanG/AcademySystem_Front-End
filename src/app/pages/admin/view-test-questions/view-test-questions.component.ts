import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject as RxjSubject, takeUntil, switchMap, Subject } from 'rxjs';
import Swal from 'sweetalert2';

import { QuestionService } from '../../../services/question.service';
import { TestService } from '../../../services/test.service';
import { materialImports } from '../../../material.imports';
import { Question } from '../../../interfaces/Question.interface';
import { Test } from '../../../interfaces/Test.interface';

@Component({
  selector: 'app-view-test-questions',
  standalone: true,
  imports: [CommonModule,materialImports()],
  templateUrl: './view-test-questions.component.html',
  styleUrl: './view-test-questions.component.css',
})
export class ViewTestQuestionsComponent implements OnInit, OnDestroy {
  public testId!: number;
  public testName!: any;
  public questions: Question[] = [];
  public CantQuestions!: number;
  public test: Test ={
      idTest: 0,
      testName: '',
      descriptionTest: '',
      maxPoints: 0,
      cantQuestions: 0,
      active: false,
      subject: {} as any,
  };

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute= inject(ActivatedRoute),
    private readonly questionService: QuestionService= inject(QuestionService),
    private readonly router: Router= inject(Router),
    private readonly snackBar: MatSnackBar= inject(MatSnackBar),
    private readonly testservice: TestService= inject(TestService)
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params) => {
          this.testId = params['testId'];
          this.testName = params['testName'];
          return this.testservice.getTest(this.testId);
        }),
        switchMap((test: Test) => {
          this.test = test;
          this.CantQuestions = test.cantQuestions;
          return this.questionService.listQuestionsOfTest(this.testId);
        })
      )
      .subscribe({
        next: (questionData: Question[]) => {
          this.questions = questionData;
        },
        error: (error) => {
          console.error('Error loading questions:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load questions. Please try again later.',
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public async deleteQuestion(idQuestion: number): Promise<void> {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      this.questionService.
      deleteQuestion(idQuestion)
      .pipe(
        takeUntil(this.destroy$),
        ).subscribe({
          next:() => {
            this.questions = this.questions.filter(
              (question) => question.idQuestion !== idQuestion
            );
            this.snackBar.open('Question deleted successfully', 'Close', {
              duration: 3000,
            });
            this.CantQuestions--;
          },
          error: (error) => {
            console.error('Error deleting question:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to delete the question. Please try again later.',
            });
          }
        });
    }
  }
}
