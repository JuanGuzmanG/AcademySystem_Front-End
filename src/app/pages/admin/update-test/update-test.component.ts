import { Component } from '@angular/core';
import { materialModule } from '../../../material.imports';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../../services/test.service';
import { SubjectService } from '../../../services/subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-test',
  imports: [materialModule],
  templateUrl: './update-test.component.html',
  styleUrl: './update-test.component.css'
})
export class UpdateTestComponent {
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
        this.router.navigate(['/admin/view-tests']);
        Swal.fire('Success', 'Test updated successfully', 'success');
      },
      (error) => {
        console.log(error);
      }
    );
  }




}
