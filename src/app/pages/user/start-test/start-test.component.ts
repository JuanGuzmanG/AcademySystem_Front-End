import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { materialImports } from '../../../material.imports';
import { QuestionService } from '../../../services/question.service';
import { ResultsService } from '../../../services/results.service';
import { LoginService } from '../../../services/login.service';
import { Subject, takeUntil } from 'rxjs';
import { Question } from '../../../interfaces/Question.interface';

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

  pointsEarned: number = 0;
  correctAnswers: number = 0;
  attempts: number = 0;

  sendTest: boolean = false;
  timer: number = 0;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private questionsService: QuestionService,
    private router: Router,
    private resultService: ResultsService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.testId = this.route.snapshot.params['testId'];
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
    // Clear the timer if the component is destroyed
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

  evaluateTest() {
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
                idTest: this.testId,
              },
            };

            this.resultService.saveResult(resultData)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (data: any) =>{
                this.attempts++;
                this.sendTest = true;
                console.log('Test submitted successfully:', data);
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
        },
      );
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
