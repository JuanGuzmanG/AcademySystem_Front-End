import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Subject as RxjSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { materialImports } from '../../../material.imports';
import { SubjectService } from '../../../services/subject.service';
import { TestService } from '../../../services/test.service';
import { Subject } from '../../../interfaces/Subject.interface';
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
    descriptionTest: '',
    maxPoints: 0,
    cantQuestions: 0,
    active: false,
    subject: {
      idSubject: '',
    },
  };

  private readonly destroy$ = new RxjSubject<void>();

  constructor(
    private subjectService: SubjectService,
    private testService: TestService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

    if (!this.test.subject.idSubject || !this.test.subject.idSubject) {
      this.snack.open('Please select a subject for the test', '', {
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
      descriptionTest: '',
      maxPoints: 0,
      cantQuestions: 0,
      active: false,
      subject: {
        idSubject: '',
      },
    };
  }
}
