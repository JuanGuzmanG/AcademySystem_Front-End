import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { materialModule } from '../../../material.imports';

@Component({
  selector: 'app-view-test-questions',
  imports: [materialModule],
  templateUrl: './view-test-questions.component.html',
  styleUrl: './view-test-questions.component.css'
})
export class ViewTestQuestionsComponent {
  testId: any;
  testName: any;
  questions: any;
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router
  ){
      this.testId = this.route.snapshot.params['testId'];
      this.testName = this.route.snapshot.params['testName'];
      this.questionService.listQuestionsOfTest(this.testId).subscribe(
        (data) => {
          console.log(data)
          this.questions = data;
        },
        (error) => {
          console.error(error);
        }
      )
  }
}
