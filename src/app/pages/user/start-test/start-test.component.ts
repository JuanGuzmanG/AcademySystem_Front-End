import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

import { QuestionService } from '../../../services/question.service';
import { ResultsService } from '../../../services/results.service';
import { Question } from '../../../interfaces/Question.interface';
import { LoginService } from '../../../services/login.service';
import { TestService } from '../../../services/test.service';
import { materialImports } from '../../../material.imports';
import { Test } from '../../../interfaces/Test.interface';

@Component({
  selector: 'app-start-test',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './start-test.component.html',
  styleUrl: './start-test.component.css',
})
export class StartTestComponent implements OnInit, OnDestroy {
  testId: any;
  questions: any;
  user: any = null;
  test?: Test;

  pointsEarned: number = 0;
  totalPoints: number = 0;
  correctAnswers: number = 0;
  attempts: number = 0;

  sendTest: boolean = false;
  timer: number = 0;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute= inject(ActivatedRoute),
    private readonly questionsService: QuestionService= inject(QuestionService),
    private readonly router: Router= inject(Router),
    private readonly resultService: ResultsService= inject(ResultsService),
    private readonly loginService: LoginService= inject(LoginService),
    private readonly testService: TestService= inject(TestService)
  ) {}

  ngOnInit(): void {
    this.testId = this.route.snapshot.params['testId'];

    this.testService
      .getTest(this.testId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Test) => {
          this.test = data;
          this.totalPoints = this.test?.maxPoints || 0;
        },
        error: (error) => {
          console.error('Error fetching test:', error);
        },
      });

    this.user = this.loginService.getUser();
    this.denyRollback();
    this.loadQuestions();

    this.resultService
      .getAttempCount(this.user.document, this.testId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.attempts = data;
        },
        error: (error) => {
          console.error('Error fetching attempt count:', error);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.timer > 0) {
      clearInterval(this.timer);
    }
  }

  loadQuestions() {
  this.questionsService
    .listQuestionsOfTest(this.testId)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: Question[]) => {
        this.questions = data;

        this.timer = this.questions.length * 2 * 60;

        this.questions.forEach((question: any) => {
          question['selectedAnswer'] = null;
        });
        this.startTimer();
      },
      error: (error) => {
        console.error('Error loading questions:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There was an error loading the questions. Please try again later.',
        });
        this.router.navigate(['/user/tests']);
      },
    });
  }

  denyRollback() {
    history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', () => {
      history.pushState(null, '', window.location.href);
    });
  }

  SendTest() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, send it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.evaluateTest();
      }
    });
  }

  evaluateTest(){
    this.questionsService
      .evaluateTest(this.questions)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.pointsEarned = data.maxPoints;
          this.correctAnswers = data.cantCorrect;

          const resultData = {
            score: this.pointsEarned,
            user: {
              document: this.user.document,
            },
            test: {
              testId: this.testId,
            },
          };
          this.resultService
            .saveResult(resultData)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: () => {
                this.attempts++;
                this.sendTest = true;
              },
              error: (error) => {
                console.error('Error saving result:', error);
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'There was an error saving your result. Please try again later.',
                });
              },
            });
        },
        error: (error) => {
          console.error('Error evaluating test:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'There was an error evaluating the test. Please try again later.',
          });
        },
      });
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        clearInterval(t);
        this.evaluateTest();
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  }

  printResult() {
    window.print();
  }
}
