import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  imports: [MatPaginator, CommonModule, materialImports()],
  templateUrl: './view-subjects.component.html',
  styleUrl: './view-subjects.component.css',
})
export class ViewsubjectsComponent implements OnInit, OnDestroy {
  public subjects: Subject[] = [];
  public paginatedSubjects: Subject[] = [];
  
  length = 0;
  pageSize = 3; 
  pageSizeOptions: number[] = [3, 6, 12];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  private readonly destroy$ = new RxjSubject<void>();
  constructor(
    private readonly subjectService: SubjectService = inject(SubjectService)
  ) {}

  ngOnInit() {
    this.loadSubjects();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  limitSubjects() {
    return this.subjects.length >= 4;
  }

  loadSubjects(): void {
    this.subjectService
      .listSubjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Subject[]) => {
          this.subjects = data;
          this.length = data.length;
          this.updatePaginatedSubjects();
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

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.paginator.pageIndex = event.pageIndex;
    this.updatePaginatedSubjects();
  }

  updatePaginatedSubjects() {
    const startIndex = this.paginator ? this.paginator.pageIndex * this.pageSize : 0;
    const endIndex = startIndex + this.pageSize;
    this.paginatedSubjects = this.subjects.slice(startIndex, endIndex);
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
        .pipe(takeUntil(this.destroy$))
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
          error: () => {
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
