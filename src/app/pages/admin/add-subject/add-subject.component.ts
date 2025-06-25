import { Component, inject, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubjectService } from '../../../services/subject.service';
import { NewSubject } from '../../../interfaces/Subject.interface';
import { materialImports } from '../../../material.imports';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './add-subject.component.html',
  styleUrl: './add-subject.component.css',
})
export class AddCategoryComponent implements OnDestroy {

  public subjectForm: FormGroup;
  subject = {
    nameSubject: '',
    descriptionSubject: '',
  };
  
  private readonly destroy$ = new Subject<void>();
  
  constructor(
    private readonly subjectservice: SubjectService = inject(SubjectService),
    private readonly snack: MatSnackBar = inject(MatSnackBar),
    private readonly router: Router = inject(Router),
    private readonly fb: FormBuilder = inject(FormBuilder),
    private readonly location: Location = inject(Location)
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

  goBack(): void {
    this.location.back();
  }

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