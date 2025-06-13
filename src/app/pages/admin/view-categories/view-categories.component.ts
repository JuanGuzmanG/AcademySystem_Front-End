import { Component } from '@angular/core';
import { materialImports } from '../../../material.imports';
import { SubjectService } from '../../../services/subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  imports: [materialImports()],
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css',
})
export class ViewCategoriesComponent {
  subjects: any[] = [];
  constructor(private categoryService: SubjectService) {
    this.loadSubjects();
  }

  loadSubjects() {
    this.categoryService.listSubjects().subscribe(
      (data: any) => {
        this.subjects = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load categories. Please try again later.',
        });
      }
    );
  }

  deleteSubject(subjectId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteSubject(subjectId).subscribe(
          () => {
            this.subjects = this.subjects.filter(
              (subject) => subject.id !== subjectId);
            Swal.fire(
              'Deleted!',
              'Your category has been deleted.',
              'success'
            );
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
    })
  }
}
