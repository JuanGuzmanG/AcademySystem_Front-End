import { Component } from '@angular/core';
import { TestService } from '../../../services/test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { materialModule } from '../../../material.imports';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  imports: [materialModule],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css',
})
export class InstructionsComponent {
  test: any;
  testId: any;

  constructor(
    private testService: TestService, 
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.testId = this.route.snapshot.params['testId'];
    this.testService.getTest(this.testId).subscribe(
      (data) => {
        this.test = data;
        console.log(this.test);
        console.log(this.testId);
      },
      (error) => {
        console.error('Error fetching test:', error);
      }
    );
  }

  onStartTest() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to pause the test once started!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, start it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Test started:', this.testId);
        this.router.navigate(['start/test/' + this.testId]);
      }
    })
  }
}