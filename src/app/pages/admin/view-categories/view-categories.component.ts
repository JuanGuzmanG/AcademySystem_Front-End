import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject as RxjSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { SubjectService } from '../../../services/subject.service';
import { materialImports } from '../../../material.imports';
import { Subject } from '../../../interfaces/subject.interface';
@Component({
  selector: 'app-view-categories',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css',
})
export class ViewCategoriesComponent implements OnInit, OnDestroy {
  public subjects: Subject[] = [];
  private readonly destoy$ = new RxjSubject<void>();

  constructor(private readonly subjectService: SubjectService) {}

  ngOnInit() {
    this.loadSubjects();
  }

  ngOnDestroy() {
    this.destoy$.next();
    this.destoy$.complete();
  }

  loadSubjects(): void {
    this.subjectService
      .listSubjects()
      .pipe(takeUntil(this.destoy$))
      .subscribe({
        next: (data) => {
          this.subjects = data;
        },
        error: (error) => {
          console.error('Error loading subjects:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load subjects. Please try again later.',
          });
        },
      });
  }

async deleteSubject(subjectId: number): Promise<void> {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
  });
  if (result.isConfirmed) {
    this.subjectService
      .deleteSubject(subjectId)
      .pipe(takeUntil(this.destoy$))
      .subscribe({
        next: () => {
          this.subjects = this.subjects.filter(
            (subject) => subject.idSubject !== subjectId
          );
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The subject has been deleted successfully.',
          });
        },
        error: (error) => {
          console.error('Error deleting subject:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete the subject. Please try again later.',
          });
        },
      });
    }
  }
}
