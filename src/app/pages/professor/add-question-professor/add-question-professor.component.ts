import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { materialImports } from '../../../material.imports';

@Component({
  selector: 'app-add-question-professor',
  imports: [materialImports()],
  templateUrl: './add-question-professor.component.html',
  styleUrl: './add-question-professor.component.css'
})
export class AddQuestionProfessorComponent {
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
    console.log(this.idTest, this.testName,this.question.test['idTest']);
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
        this.question.test['idTest'] = this.idTest;
        this.router.navigate(['/professor/view-tests/'+this.testName+'/'+this.idTest+'/questions']);
      },
      (error) =>{Swal.fire('Error', 'Error adding question', 'error')}
    );
  }
}

