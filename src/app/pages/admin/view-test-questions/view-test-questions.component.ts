import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { materialImports } from '../../../material.imports';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TestService } from '../../../services/test.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-view-test-questions',
  imports: [materialImports()],
  templateUrl: './view-test-questions.component.html',
  styleUrl: './view-test-questions.component.css',
})
export class ViewTestQuestionsComponent {
  testId: any;
  testName: any;
  questions: any = [];
  test: any;
  CantQuestions: any;

  ngOnInit(): void {
    this.testId = this.route.snapshot.params['testId'];
    this.testName = this.route.snapshot.params['testName'];

    this.testservice
      .getTest(this.testId)
      .pipe(
        switchMap((testData) => {
          // En este punto, this.test ya tiene valor
          this.test = testData;
          this.CantQuestions = this.test.cantQuestions;

          return this.questionService.listQuestionsOfTest(this.testId);
        })
      )
      .subscribe({
        next: (questionsData) => {
          // El resultado de la segunda llamada llega aquí
          this.questions = questionsData;
        },
        error: (error) => {
          console.error('Ocurrió un error al cargar los datos:', error);
          this.snackBar.open(
            'Error al cargar las preguntas del examen',
            'Cerrar',
            { duration: 3000 }
          );
        },
      });

    this.questionService.listQuestionsOfTest(this.testId).subscribe(
      (data) => {
        this.questions = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router,
    private snackBar: MatSnackBar,
    private testservice: TestService
  ) {}

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
