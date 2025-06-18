import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject as RxjSubject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';


import { TestService } from '../../../services/test.service';
import { SubjectService } from '../../../services/subject.service';
import { materialImports } from '../../../material.imports';
import { Test } from '../../../interfaces/Test.interface';
import { Subject } from '../../../interfaces/Subject.interface';

@Component({
  selector: 'app-view-test-professor',
  standalone: true,
  imports: [CommonModule,materialImports()],
  templateUrl: './view-test-professor.component.html',
  styleUrl: './view-test-professor.component.css',
})
export class ViewTestProfessorComponent implements OnInit, OnDestroy {
  public tests: Test[] = [];
  public subjects: Subject[] = [];

  private readonly destroy$ = new RxjSubject<void>();

  constructor(
    private readonly testService: TestService,
    private readonly subjectService: SubjectService
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
      takeUntil(this.destroy$),
      finalize(() => console.log('Tests loaded'))
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
      takeUntil(this.destroy$),
      finalize(() => console.log('Subjects loaded'))
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

  public async deleteTest(idTest: number): Promise<void> {
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
      this.testService.deleteTest(idTest).pipe(
        takeUntil(this.destroy$),
        finalize(() => console.log('Test deleted'))
      ).subscribe({
        next: () => {
          this.tests = this.tests.filter(test => test.idTest !== idTest);
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
