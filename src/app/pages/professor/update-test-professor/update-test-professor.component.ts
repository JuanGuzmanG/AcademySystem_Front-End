import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { TestService } from '../../../services/test.service';
import { SubjectService } from '../../../services/subject.service';
import { materialImports } from '../../../material.imports';

@Component({
  selector: 'app-update-test-professor',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './update-test-professor.component.html',
  styleUrl: './update-test-professor.component.css'
})
export class UpdateTestProfessorComponent {
  testId = 0;
  test:any;
  subjects:any;
  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
    private subjectService: SubjectService,
    private router: Router
  ){
    this.testId = this.route.snapshot.params['testId'];
    this.testService.getTest(this.testId).subscribe(
      (data)=> {
        this.test = data;
      },
      (error)=>{
        console.log(error);
      }
    )

    this.subjectService.listSubjects().subscribe(
      (data)=> {
        this.subjects = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  updateTest() {
    this.testService.updateTest(this.test).subscribe(
      (data) => {
        this.router.navigate(['/professor/view_tests']);
        Swal.fire('Success', 'Test updated successfully', 'success');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

