import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { TestService } from '../../../services/test.service';
import { materialImports } from '../../../material.imports';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-instructions',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css',
})
export class InstructionsComponent {
  test: any;
  testId: any;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private testService: TestService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.testId = this.route.snapshot.params['testId'];
    this.testService
      .getTest(this.testId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.test = data;
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load test instructions.',
          });
        }
      });
  }

  goBack() {
    this.location.back();
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
    });
  }
}
