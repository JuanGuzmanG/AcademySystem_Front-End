import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { SubjectService } from '../../../services/subject.service';
import { materialImports } from '../../../material.imports';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-update-subject',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './update-subject.component.html',
  styleUrl: './update-subject.component.css'
})
export class UpdateSubjectComponent {
  idSubject:any;
  subject:any;
  private readonly destroy$ = new Subject<void>();
  constructor(
    private subjectservice: SubjectService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.idSubject = this.route.snapshot.params['subjectId'];
    this.subjectservice.getsubjectById(this.idSubject)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data) => {
        this.subject = data;
      },
      error: (error) => {
        console.error('Error fetching subject:', error);
      }
    });
  }

  onSubmit() {
    this.subjectservice.updateSubject(this.subject).subscribe((data: any) => {
      this.router.navigate(['/admin/subjects']);
  });
  }
}
