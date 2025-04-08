import { Component } from '@angular/core';
import { materialImports } from '../../../material.imports';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-test',
  imports: [materialImports()],
  templateUrl: './start-test.component.html',
  styleUrl: './start-test.component.css',
})
export class StartTestComponent {
  testId: any;
  questions: any;

  pointsEarned: number = 0;
  correctAnswers: number = 0;
  attempts: number = 0;

  sendTest: boolean = false;
  timer: number = 0;

  constructor(
    private route: ActivatedRoute,
    private questionsService: QuestionService,
    private router: Router
  ) {
    this.testId = this.route.snapshot.params['testId'];
    this.denyRollback();
    this.loadQuestions();
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

  evaluateTest(){
    this.questionsService.evaluateTest(this.questions).subscribe(
      (data:any) => {
        this.pointsEarned = data.maxPoints;
        this.correctAnswers = data.cantCorrect;
        this.attempts = data.attempts;

        this.sendTest = true;
      }
    );
  }

  startTimer(){
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
