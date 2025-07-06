import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subject as RxjSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { SubjectService } from '../../../services/subject.service';
import { Subject } from '../../../interfaces/Subject.interface';
import { TestService } from '../../../services/test.service';
import { materialImports } from '../../../material.imports';
import { Test } from '../../../interfaces/Test.interface';

@Component({
  selector: 'app-view-tests',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    materialImports(),
    MatPaginator,
    MatChipsModule
  ],
  templateUrl: './view-tests.component.html',
  styleUrl: './view-tests.component.css',
})
export class ViewTestsComponent implements OnInit, OnDestroy, AfterViewInit {
  public tests: Test[] = [];
  public subjects: Subject[] = [];
  public paginatedTests: Test[] = [];

  length = 0;
  pageSize = 3;
  pageSizeOptions: number[] = [3, 6, 12];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private readonly destroy$ = new RxjSubject<void>();

  private readonly testService = inject(TestService);
  private readonly subjectService = inject(SubjectService);

  ngOnInit() {
    this.loadTests();
    this.loadSubjects();
  }

  ngAfterViewInit() {
    if (this.tests.length > 0) {
      this.updatePaginatedTests();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTests() {
    this.testService
      .listTests()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Test[]) => {
          this.tests = data;
          this.length = data.length;
          if (this.paginator) {
            this.updatePaginatedTests();
          }
        },
        error: (error) => {
          console.error(error);
          Swal.fire('Error', 'No se pudieron cargar los tests.', 'error');
        },
      });
  }

  loadSubjects(): void {
    this.subjectService
      .listSubjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Subject[]) => {
          this.subjects = data;
        },
        error: (error) => {
          console.error(error);
          Swal.fire('Error', 'No se pudieron cargar las asignaturas.', 'error');
        },
      });
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.updatePaginatedTests();
  }

  updatePaginatedTests() {
    if (!this.paginator) return;

    const startIndex = this.paginator.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTests = this.tests.slice(startIndex, endIndex);
  }

  public deleteTest(testId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡bórralo!',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.testService
          .deleteTest(testId)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.tests = this.tests.filter((test) => test.testId !== testId);
              this.length = this.tests.length;
              this.updatePaginatedTests(); 

              Swal.fire('¡Eliminado!', 'El test ha sido eliminado.', 'success');
            },
            error: (error) => {
              console.error(error);
              Swal.fire(
                'Error',
                'Ocurrió un error al eliminar el test.',
                'error'
              );
            },
          });
      }
    });
  }
}
