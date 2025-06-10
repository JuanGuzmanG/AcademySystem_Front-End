import { Component } from '@angular/core';
import { materialImports } from '../../../material.imports';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { ResultsService } from '../../../services/results.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-start-test',
  imports: [materialImports()],
  templateUrl: './start-test.component.html',
  styleUrl: './start-test.component.css',
})
export class StartTestComponent {
  testId: any;
  questions: any;
  user: any = null;

  pointsEarned: number = 0;
  correctAnswers: number = 0;
  attempts: number = 0;

  sendTest: boolean = false;
  timer: number = 0;

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
      .subscribe(
        (data: any) => {
          this.attempts = data;
        },
        (error) => {
          console.error('Error fetching attempt count:', error);
        }
      );
  }

  loadQuestions() {
    this.questionsService.listQuestionsOfTest(this.testId).subscribe(
      (data) => {
        this.questions = data;

        this.timer = this.questions.length * 2 * 60;

        this.questions.forEach((question: any) => {
          question['selectedAnswer'] = null;
        });
        this.startTimer();
      },
      (error) => {
        console.error('Error loading questions:', error);
      }
    );
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
      .subscribe((data: any) => {
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

        this.resultService.saveResult(resultData).subscribe(
          (data) => {
            this.attempts++;
            this.sendTest = true;
            console.log('Test submitted successfully:', data);
          },
          (error) => {
            console.error('Error submitting test:', error);
          }
        );
      },
      (error) => {
        console.error('Error evaluating test:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There was an error evaluating the test. Please try again later.',
        });
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
