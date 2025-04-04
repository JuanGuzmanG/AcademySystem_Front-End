import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { materialModule } from '../../../material.imports';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-test-questions',
  imports: [materialModule],
  templateUrl: './view-test-questions.component.html',
  styleUrl: './view-test-questions.component.css',
})
export class ViewTestQuestionsComponent {
  testId: any;
  testName: any;
  questions: any;
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.testId = this.route.snapshot.params['testId'];
    this.testName = this.route.snapshot.params['testName'];
    this.questionService.listQuestionsOfTest(this.testId).subscribe(
      (data) => {
        this.questions = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteQuestion(idQuestion: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.deleteQuestion(idQuestion).subscribe(
          (data) => {
            this.questions = this.questions.filter(
              (question: any) => question.idQuestion != idQuestion
            );
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }
}
