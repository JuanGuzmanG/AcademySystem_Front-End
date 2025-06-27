import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject as RxjSubject } from 'rxjs';
import Swal from 'sweetalert2';


import { SubjectService } from '../../../services/subject.service';
import { Subject } from '../../../interfaces/Subject.interface';
import { TestService } from '../../../services/test.service';
import { materialImports } from '../../../material.imports';
import { Test } from '../../../interfaces/Test.interface';
@Component({
  selector: 'app-view-tests',
  standalone: true,
  imports: [CommonModule,materialImports()],
  templateUrl: './view-tests.component.html',
  styleUrl: './view-tests.component.css',
})
export class ViewTestsComponent implements OnInit, OnDestroy {
  public tests: Test[] = [];
  public subjects: Subject[] = [];

  private readonly destroy$ = new RxjSubject<void>();

  constructor(
    private readonly testService: TestService = inject(TestService),
    private readonly subjectService: SubjectService = inject(SubjectService)
  ) {}

  ngOnInit() {
    this.loadTests();
    this.loadSubjects();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTests(){
    this.testService.listTests().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data: Test[]) => {
        this.tests = data;
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading tests', 'error');
      }
    })
  }

  loadSubjects(): void {
    this.subjectService.listSubjects().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data: Subject[]) => {
        this.subjects = data;
        if (this.subjects.length === 0) {
          Swal.fire('Info', 'No subjects available, Add Subjects First', 'info');
        }
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading subjects', 'error');
      }
    });
  }

  public async deleteTest(testId: number): Promise<void> {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    });
    if (result.isConfirmed) {
      this.testService.deleteTest(testId).pipe(
        takeUntil(this.destroy$),
        finalize(() => console.log('Test deleted'))
      ).subscribe({
        next: () => {
          this.tests = this.tests.filter(test => test.testId !== testId);
          Swal.fire('Deleted!', 'Test has been deleted.', 'success');
        },
        error: (error) => {
          console.log(error);
          Swal.fire('Error', 'Error in deleting test', 'error');
        }
      });
    }
  }
}
