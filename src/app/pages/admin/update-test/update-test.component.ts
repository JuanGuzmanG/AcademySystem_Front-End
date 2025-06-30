import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import Swal from 'sweetalert2';

import { SubjectService } from '../../../services/subject.service';
import { TestService } from '../../../services/test.service';
import { materialImports } from '../../../material.imports';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-update-test',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './update-test.component.html',
  styleUrl: './update-test.component.css',
})
export class UpdateTestComponent implements OnDestroy, OnInit {
  testId = 0;
  test: any;

  subjects: any;
  MaxPointsOptions = ['10', '20', '50', '100', '150'];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute = inject(ActivatedRoute),
    private readonly testService: TestService = inject(TestService),
    private readonly subjectService: SubjectService = inject(SubjectService),
    private readonly router: Router = inject(Router),
    private readonly location: Location = inject(Location),
    private readonly snack: MatSnackBar = inject(MatSnackBar)
  ) {
    this.testId = this.route.snapshot.params['testId'];
  }

  ngOnInit(): void {
    this.testService
      .getTest(this.testId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.test = data;
        },
        error: (error) => {
          console.error('Error fetching test:', error);
        },
      });
    this.subjectService
      .listSubjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.subjects = data;
        },
        error: (error) => {
          console.error('Error fetching subjects:', error);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateTest() {

    if (!this.test.testName || this.test.testName === '') {
      this.snack.open('Please enter a test name', '', {
        duration: 3000,
      });
      return;
    }

    if (!this.test.subject.subjectId || !this.test.subject.subjectId) {
      this.snack.open('Please select a subject for the test', '', {
        duration: 3000,
      });
      return;
    }
    if(this.test.cantQuestions <= 0 || this.test.cantQuestions > 5) {
      Swal.fire('Error', 'Number of questions must be between 1 and 10', 'error');
      return;
    }

    this.testService
      .updateTest(this.test)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.router.navigate(['/admin/view-tests']);
          Swal.fire('Success', 'Test updated successfully', 'success');
        },
        error: (error) => {
          console.error('Error updating test:', error);
          Swal.fire('Error', 'Failed to update test', 'error');
        },
      });
  }

  goBack() {
    this.location.back();
  }
}
