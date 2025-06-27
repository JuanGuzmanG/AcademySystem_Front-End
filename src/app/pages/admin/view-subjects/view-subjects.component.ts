import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject as RxjSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { SubjectService } from '../../../services/subject.service';
import { Subject } from '../../../interfaces/Subject.interface';
import { materialImports } from '../../../material.imports';
@Component({
  selector: 'app-view-categories',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './view-subjects.component.html',
  styleUrl: './view-subjects.component.css',
})
export class ViewsubjectsComponent implements OnInit, OnDestroy {
  public subjects: Subject[] = [];
  private readonly destoy$ = new RxjSubject<void>();

  constructor(
    private readonly subjectService: SubjectService=inject(SubjectService)
  ) {}

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
      error: () => {
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
            (subject) => subject.subjectId !== subjectId
          );
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The subject has been deleted successfully.',
          });
        },
        error: (error) => {
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
