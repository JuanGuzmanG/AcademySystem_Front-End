import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule, Location } from '@angular/common';
import { Subject as RxjSubject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { SubjectService } from '../../../services/subject.service';
import { Subject } from '../../../interfaces/Subject.interface';
import { TestService } from '../../../services/test.service';
import { materialImports } from '../../../material.imports';
import { Test } from '../../../interfaces/Test.interface';
@Component({
  selector: 'app-add-test-professor',
  standalone: true,
  imports: [CommonModule,materialImports()],
  templateUrl: './add-test-professor.component.html',
  styleUrl: './add-test-professor.component.css'
})
export class AddTestProfessorComponent implements OnInit, OnDestroy {
  public subjects: Subject[] = [];
  public test = {
    testName: '',
    descriptionTest: '',
    maxPoints: 0,
    cantQuestions: 0,
    active: false,
    subject: {
      idSubject: '',
    },
  }
  
  private destroy$ = new RxjSubject<void>();

  constructor(
    private subjectService: SubjectService, 
    private testService: TestService,
    private snack: MatSnackBar,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goBack() {
    this.location.back();
  }

  loadSubjects() {
    this.subjectService.listSubjects()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: Subject[]) => {
        this.subjects = data;
        if (this.subjects.length === 0) {
          Swal.fire({
            title: 'No Subjects Found',
            text: 'Please create a subject before adding a test.',
            icon: 'warning',
            confirmButtonText: 'OK'
          });
        }
      },
      error: (error) => {
        console.error('Error loading subjects:', error);
        this.snack.open('Error loading subjects', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  public async saveTest(): Promise<void> {
    if(!this.test || this.test.testName.trim() === '') {
      this.snack.open('Please enter a test name', 'Close', {
        duration: 3000,
        panelClass: ['warning-snackbar']
      });
      return;
    }

    if(!this.test.subject || !this.test.subject.idSubject) {
      this.snack.open('Please select a subject', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.testService.addTest(this.test)
    .pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: async (data: Test) => {
        await Swal.fire({
          title: 'Success',
          text: 'Test created successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/professor/0']);
        this.resetTestForm();
      }
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
      }
    };
  }
}
