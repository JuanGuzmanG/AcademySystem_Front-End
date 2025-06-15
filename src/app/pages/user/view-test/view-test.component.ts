import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject as RxjSubject } from 'rxjs';
import { takeUntil } from 'rxjs';


import { materialImports } from '../../../material.imports';
import { TestService } from '../../../services/test.service';
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

  private readonly destroy$ = new RxjSubject<void>();

  constructor(
    private testService: TestService,
    private route: ActivatedRoute
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
}
