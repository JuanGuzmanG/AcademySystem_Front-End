import { Component } from '@angular/core';
import { materialModule } from '../../../material.imports';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { queueScheduler } from 'rxjs';
import { Console } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-test',
  imports: [materialModule],
  templateUrl: './start-test.component.html',
  styleUrl: './start-test.component.css',
})
export class StartTestComponent {
  testId: any;
  questions: any;
  pointsEarned: number = 0;
  correctAnswers: number = 0;
  attempts: number = 0;

  constructor(
    private route: ActivatedRoute,
    private questionsService: QuestionService
  ) {
    this.testId = this.route.snapshot.params['testId'];
    this.denyRollback();
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionsService.listQuestionsOfTest(this.testId).subscribe(
      (data) => {
        this.questions = data;

        this.questions.forEach((question: any) => {
          question['selectedAnswer'] = null;
        });
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
        this.questions.forEach((question: any) => {
          if (question.selectedAnswer == question.correctOption) {
            this.correctAnswers++;
            let points = this.questions[0].test.maxPoints / this.questions.length;
            this.pointsEarned += points;
            console.log('puntos ganados ', this.pointsEarned);
            console.log('respuestas correctas ', this.correctAnswers);
            console.log(this.questions);
          }
        });
      }
    });
  }
}
