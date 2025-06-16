import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { TestService } from '../../../services/test.service';
import { materialImports } from '../../../material.imports';

@Component({
  selector: 'app-instructions',
  imports: [CommonModule, materialImports()],
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
        this.router.navigate(['start/test/' + this.testId]);
      }
    })
  }
}