import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { TestService } from '../../../services/test.service';
import { materialImports } from '../../../material.imports';
import { SubjectService } from '../../../services/subject.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-update-test',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './update-test.component.html',
  styleUrl: './update-test.component.css',
})
export class UpdateTestComponent {
  testId = 0;
  test: any;
  subjects: any;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
    private subjectService: SubjectService,
    private router: Router
  ) {
    this.testId = this.route.snapshot.params['testId'];
    this.testService
      .getTest(this.testId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.test = data;
        },
        error: (error) => {
          console.error('Error fetching test:', error);
        },
      });

    this.subjectService
    .listSubjects()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data) => {
        this.subjects = data;
    },
      error: (error) => {
        console.error('Error fetching subjects:', error);
      },
    });
  }

  updateTest() {
    this.testService.updateTest(this.test).subscribe(
      () => {
        this.router.navigate(['/admin/view-tests']);
        Swal.fire('Success', 'Test updated successfully', 'success');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
