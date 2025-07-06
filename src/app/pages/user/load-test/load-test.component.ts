import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {
  Component,
  inject,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TestService } from '../../../services/test.service';
import { materialImports } from '../../../material.imports';
import { Test } from '../../../interfaces/Test.interface';
import { SubjectService } from '../../../services/subject.service';

@Component({
  selector: 'app-load-test',
  standalone: true,
  imports: [MatPaginator, CommonModule, materialImports()],
  templateUrl: './load-test.component.html',
  styleUrl: './load-test.component.css',
})
export class LoadTestComponent implements OnInit {
  subjectId: any;
  subjectName: string = '';
  tests: Test[] = [];

  public paginatedTests: Test[] = [];
  length = 0;
  pageSize = 6;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly testService: TestService = inject(TestService);
  private readonly subjectService: SubjectService = inject(SubjectService);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.subjectId = params['subjectID'];
      if (this.subjectId == 0) {
        this.testService.listTestByState().subscribe({
          next: (data: Test[]) => {
            this.tests = data;
            this.updateComponentState();
          },
          error: (error) => {
            console.log(error);
            this.tests = [];
            this.updateComponentState();
          },
        });
      } else {
        this.subjectService.getsubjectById(this.subjectId).subscribe({
          next: (data) => {
            this.subjectName = data.subjectName;
          },
          error: (error) => {
            console.log(error);
          },
        });
        this.testService.listTestsBySubjectId(this.subjectId).subscribe({
          next: (data: Test[]) => {
            this.tests = data;
            this.updateComponentState();
          },
          error: (error) => {
            console.log(error);
            this.tests = [];
            this.updateComponentState();
          },
        });
      }
    });
  }

  updateComponentState() {
    this.length = this.tests.length;
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.updatePaginatedTests();
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.updatePaginatedTests();
  }

  updatePaginatedTests() {
    if (!this.tests) {
      this.paginatedTests = [];
      return;
    }
    const startIndex = this.paginator
      ? this.paginator.pageIndex * this.paginator.pageSize
      : 0;
    const endIndex =
      startIndex + (this.paginator ? this.paginator.pageSize : this.pageSize);
    this.paginatedTests = this.tests.slice(startIndex, endIndex);
  }
}
