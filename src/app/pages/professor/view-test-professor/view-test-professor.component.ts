import { Component } from '@angular/core';
import { TestService } from '../../../services/test.service';
import Swal from 'sweetalert2';
import { materialImports } from '../../../material.imports';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-test-professor',
  imports: [materialImports()],
  templateUrl: './view-test-professor.component.html',
  styleUrl: './view-test-professor.component.css',
})
export class ViewTestProfessorComponent {
  idSubject: any;
  tests: any = [];

  constructor(private route: ActivatedRoute, private testService: TestService) {
    this.route.params.subscribe((params) => {
      this.idSubject = params['idSubject'];
      if (this.idSubject == 0) {
        this.testService.listTestByState().subscribe(
          (data) => {
            this.tests = data;
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.testService.listTestsBySubjectId(this.idSubject).subscribe(
          (data) => {
            this.tests = data;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  deleteTest(idTest: any) {
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
        this.testService.deleteTest(idTest).subscribe(
          (data) => {
            this.tests = this.tests.filter(
              (test: any) => test.testId != idTest
            );
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            this.testService.listTests().subscribe((data) => {
              this.tests = data;
            });
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', 'Error in deleting data', 'error');
          }
        );
      }
    });
  }
}
