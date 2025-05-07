import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { materialImports } from '../../../material.imports';

@Component({
  selector: 'app-view-test-questions-professor',
  imports: [materialImports()],
  templateUrl: './view-test-questions-professor.component.html',
  styleUrl: './view-test-questions-professor.component.css'
})
export class ViewTestQuestionsProfessorComponent {
  idTest: any;
  testName: any;
  questions: any;
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.idTest = this.route.snapshot.params['idTest'];
    this.testName = this.route.snapshot.params['testName'];
    this.questionService.listQuestionsOfTest(this.idTest).subscribe(
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

