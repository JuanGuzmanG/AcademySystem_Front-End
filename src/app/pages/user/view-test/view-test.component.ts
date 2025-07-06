import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Subject as RxjSubject } from 'rxjs';
import { takeUntil } from 'rxjs';

import { TestService } from '../../../services/test.service';
import { materialImports } from '../../../material.imports';
import { Test } from '../../../interfaces/Test.interface';

@Component({
  selector: 'app-view-test',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './view-test.component.html',
  styleUrl: './view-test.component.css'
})
export class ViewTestComponent implements OnInit, OnDestroy {
  test: Test | null = null;
  testId: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  private readonly destroy$ = new RxjSubject<void>();

  constructor(
    private readonly testService: TestService=inject(TestService),
    private readonly route: ActivatedRoute=inject(ActivatedRoute),
    private readonly location: Location=inject(Location)
  ){}

  ngOnInit() {
    this.loadTest();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTest() {
    this.testId = this.route.snapshot.params['testId'];
    
    this.testService.getTest(this.testId)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: Test) => {
        this.test = data;
      },
      error: (error) => {
        console.error('Error loading test:', error);
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
