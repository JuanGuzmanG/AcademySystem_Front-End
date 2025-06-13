import { Component } from '@angular/core';
import { Subject as RxjSubject } from 'rxjs';
import Swal from 'sweetalert2';

import { SubjectService } from '../../../services/subject.service';
import { materialImports } from '../../../material.imports';
@Component({
  selector: 'app-view-categories',
  imports: [materialImports()],
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css',
})
export class ViewCategoriesComponent {
  public subjects: any[] = [];
  private readonly destoy$ = new RxjSubject<void>();

  constructor(private readonly subjectService: SubjectService) {}

  ngOnInit() {
    this.loadSubjects();
  }

  ngOnDestroy() {
    this.destoy$.next();
    this.destoy$.complete();
  }

  loadSubjects(): void {
    this.subjectService.listSubjects().subscribe(
      (data: any) => {
        this.subjects = data;
      },
      (error) => {
        console.error('Error fetching subjects:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load subjects. Please try again later.',
        });
      }
    );
  }

  deleteSubject(subjectId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.subjectService.deleteSubject(subjectId).subscribe(
          () => {
            this.subjects = this.subjects.filter(
              (subject) => subject.id !== subjectId
            );
            Swal.fire('Deleted!', 'Your category has been deleted.', 'success');
            this.loadSubjects();
          },
          (error) => {
            console.error('Error deleting category:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to delete category. Please try again later.',
            });
          }
        );
      }
    });
  }
}
