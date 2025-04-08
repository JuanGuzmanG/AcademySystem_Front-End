import { Component } from '@angular/core';
import { materialImports } from '../../../material.imports';
import { TestService } from '../../../services/test.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-tests',
  imports: [materialImports()],
  templateUrl: './view-tests.component.html',
  styleUrl: './view-tests.component.css',
})
export class ViewTestsComponent {
  tests: any = [];

  constructor(private testService: TestService) {
    this.testService.listTests().subscribe(
      (data) => {
        this.tests = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in landing data', 'error');
      }
    );
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
              (test: any) => test.testId != idTest);
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            this.testService.listTests().subscribe(
              (data) => {
                this.tests = data;
              },
            );
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
