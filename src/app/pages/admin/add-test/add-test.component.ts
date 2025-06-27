import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule,Location } from '@angular/common';
import { Subject as RxjSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { SubjectService } from '../../../services/subject.service';
import { Subject } from '../../../interfaces/Subject.interface';
import { TestService } from '../../../services/test.service';
import { materialImports } from '../../../material.imports';
@Component({
  selector: 'app-add-test',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './add-test.component.html',
  styleUrl: './add-test.component.css',
})
export class AddTestComponent implements OnInit, OnDestroy {
  subjects: Subject[] = [];
  test = {
    testName: '',
    testDescription: '',
    maxPoints: 0,
    cantQuestions: 0,
    active: false,
    subject: {
      subjectId: '',
    },
  };
  MaxPointsOptions = [10, 20, 50, 100, 150];

  private readonly destroy$ = new RxjSubject<void>();

  constructor(
    private readonly subjectService: SubjectService=inject(SubjectService),
    private readonly testService: TestService=inject(TestService),
    private readonly snack: MatSnackBar= inject(MatSnackBar),
    private readonly location: Location= inject(Location),
    private readonly router: Router= inject(Router)
  ) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goBack(): void {
    this.location.back();
  }

  private loadSubjects() {
    this.subjectService
      .listSubjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Subject[]) => {
          this.subjects = data;
          if (this.subjects.length === 0) {
            Swal.fire(
              'No Subjects Found',
              'Please add a subject before creating a test.',
              'info'
            ).then(() => this.router.navigate(['/admin/add-subject']));
          }
        },
        error: (error) => {
          console.error('Error loading subjects:', error);
          this.snack.open('Error loading subjects', '', {
            duration: 3000,
          });
        },
      });
  }

  public async saveTest(): Promise<void> {
    if (!this.test.testName || this.test.testName.trim() === '') {
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

    if( this.test.maxPoints <= 0) {
      this.snack.open('Please select a valid maximum points value', '', {
        duration: 3000,
      });
      return;
    }

    if (this.test.cantQuestions <= 0 || this.test.cantQuestions > 50) {
      this.snack.open('Please enter a valid number of questions 0 - 50', '', {
        duration: 3000,
      });
      return;
    }

    this.testService
      .addTest(this.test)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: async (data) => {
          Swal.fire({
            title: 'Test Created',
            text: `Test "${data.testName}" has been created successfully.`,
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.router.navigate(['/admin/view-tests']);
          this.resetTestForm();
        },
        error: (error) => {
          console.error('Error creating test:', error);
          this.snack.open('Error creating test', '', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        },
      });
  }

  private resetTestForm() {
    this.test = {
      testName: '',
      testDescription: '',
      maxPoints: 0,
      cantQuestions: 0,
      active: false,
      subject: {
        subjectId: '',
      },
    };
  }
}
