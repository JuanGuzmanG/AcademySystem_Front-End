import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { materialImports } from '../../../material.imports';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  imports: [materialImports()],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css',
})
export class AddQuestionComponent {
  idTest: any;
  testName: any;
  question: any = {
    test: {},
    contentQuestion: '',
    imageQuestion: null,
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctOption: '',
  };

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router
  ) {
    this.idTest = this.route.snapshot.params['idTest'];
    this.testName = this.route.snapshot.params['testName'];
    this.question.test['idTest'] = this.idTest;
  }

  onSubmit() {
    if(this.question.contentQuestion.trim() == '' || 
      this.question.correctOption.trim() == ''||
      this.question.option1.trim() == '' ||
      this.question.option2.trim() == '' ||
      this.question.option3.trim() == '' ||
      this.question.option4.trim() == ''
    ) {
      Swal.fire('Error', 'Please enter all options, correct answer and question', 'error');
      return;
    }
    this.question.contentQuestion = '¿' + this.question.contentQuestion + '?';
    
    this.questionService.addQuestion(this.question).subscribe(
      (data) => {
        Swal.fire('Sucess', 'Question added successfully', 'success');
        this.question.contentQuestion = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
        this.question.correctOption = '';
        this.question.test['testId'] = this.idTest;
        this.router.navigate(['/admin/questions/'+this.testName+'/'+this.idTest]);
      },
      (error) =>{Swal.fire('Error', 'Error adding question', 'error')}
    );
  }
}
