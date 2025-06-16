import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { QuestionService } from '../../../services/question.service';
import { materialImports } from '../../../material.imports';
import { TestService } from '../../../services/test.service';

@Component({
  selector: 'app-update-question-professor',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './update-question-professor.component.html',
  styleUrl: './update-question-professor.component.css'
})
export class UpdateQuestionProfessorComponent {
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
    this.questionId = this.route.snapshot.params['idQuestion'];
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
        this.router.navigate(['/professor/view-tests/'+this.testName+'/'+this.testId+'/questions']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
