import { Component } from '@angular/core';
import { materialImports } from '../../../material.imports';
import { SubjectService } from '../../../services/subject.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TestService } from '../../../services/test.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-test',
  imports: [materialImports()],
  templateUrl: './add-test.component.html',
  styleUrl: './add-test.component.css',
})
export class AddTestComponent {
  subjects: any = [];

  test = {
    testName: '',
    descriptionTest: '',
    maxPoints: 0,
    cantQuestions: 0,
    active: false,
    subject: {
      idSubject: '',
    },
  };

  constructor(private subjectService: SubjectService, private snack: MatSnackBar, private testService: TestService,private router: Router) {
    this.subjectService.listSubjects().subscribe(
      (data: any) => {
        this.subjects = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error loading subjects', 'error');
      }
    );
  }
  
  saveTest() {
    console.log(this.test);
    if(this.test.testName.trim() =='' || this.test.testName == null){
      this.snack.open('Test name is required', '',{
        duration:3000
      });
      return;
    }

    this.testService.addTest(this.test).subscribe(
      (data)=>{
        this.router.navigate(['/admin/view-tests']);
        Swal.fire('Success', 'Test added successfully', 'success').then((e) => {
          this.test = {
            testName: '',
            descriptionTest: '',
            maxPoints: 0,
            cantQuestions: 0,
            active: false,
            subject: {
              idSubject: '',
            },
          };
        });
      },
      (error) =>{
        console.log(error);
        Swal.fire('Error', 'Error adding test', 'error');
      }
    )
  }
}
