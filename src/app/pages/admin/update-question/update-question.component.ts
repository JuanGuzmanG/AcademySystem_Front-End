import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../../services/test.service';
import { QuestionService } from '../../../services/question.service';
import { materialImports } from '../../../material.imports';

@Component({
  selector: 'app-update-question',
  imports: [materialImports()],
  templateUrl: './update-question.component.html',
  styleUrl: './update-question.component.css'
})
export class UpdateQuestionComponent {
  testId: any;
  questionId: any;
  testName: any;
  question: any={};
  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
    private router: Router,
    private questionService: QuestionService
  ){
    this.testId = this.route.snapshot.params['idTest'];
    this.questionId = this.route.snapshot.params['questionId'];
    this.testName = this.route.snapshot.params['testName'];
    this.questionService.getQuestion(this.questionId).subscribe(
      (data)=> {
        this.question = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  onSubmit(){
    this.questionService.updateQuestion(this.question).subscribe(
      (data) => {
        this.router.navigate(['/admin/questions/'+this.testName+'/'+this.testId]);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
