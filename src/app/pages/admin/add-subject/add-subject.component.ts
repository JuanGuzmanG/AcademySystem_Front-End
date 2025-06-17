import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { SubjectService } from '../../../services/subject.service';
import { materialImports } from '../../../material.imports';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewSubject } from '../../../interfaces/Subject.interface';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './add-subject.component.html',
  styleUrl: './add-subject.component.css',
})
export class AddCategoryComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  public subjectForm: FormGroup;

  constructor(
    private subjectservice: SubjectService = inject(SubjectService),
    private snack: MatSnackBar = inject(MatSnackBar),
    private router: Router = inject(Router),
    private fb: FormBuilder = inject(FormBuilder)
  ) {
    this.subjectForm = this.fb.group({
      nameSubject: ['', [Validators.required, Validators.minLength(3)]],
      descriptionSubject: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions or resources if needed
    this.destroy$.next();
    this.destroy$.complete();
  }

  subject = {
    nameSubject: '',
    descriptionSubject: '',
  };

  onSubmit(): void {
    if (this.subjectForm.invalid) {
      this.snack.open('Please fill all the fields or should be longer', 'OK', {
        duration: 3000,
      });
      return;
    }

    const newSubjectData: NewSubject = this.subjectForm.value;

    this.subjectservice
    .addSubject(newSubjectData)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: () => {
        this.subjectForm.reset();
        Swal.fire('success', 'Category added successfully', 'success');
        this.router.navigate(['/admin/subjects']);
      },
      error: (error) => {
        console.error('Error adding subject:', error);
        this.snack.open('Error adding subject', 'OK', {
          duration: 3000,
        });
      },
    });
  }
}
