import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { SubjectService } from '../../../services/subject.service';
import { materialImports } from '../../../material.imports';
@Component({
  selector: 'app-update-subject',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './update-subject.component.html',
  styleUrl: './update-subject.component.css',
})
export class UpdateSubjectComponent implements OnInit, OnDestroy {
  idSubject: any;
  subject: any;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly subjectservice: SubjectService = inject(SubjectService),
    private readonly route: ActivatedRoute = inject(ActivatedRoute),
    private readonly router: Router = inject(Router),
    private readonly location: Location = inject(Location)
  ) {
    this.idSubject = this.route.snapshot.params['subjectId'];
  }

  ngOnInit(): void {
    this.subjectservice
    .getsubjectById(this.idSubject)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data) => {
        this.subject = data;
      },
      error: (error) => {
        console.error('Error fetching subject:', error);
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    this.subjectservice.updateSubject(this.subject).subscribe(() => {
      this.router.navigate(['/admin/subjects']);
    });
  }

  goBack() {
    this.location.back();
  }
}
