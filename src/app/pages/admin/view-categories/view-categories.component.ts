import { Component } from '@angular/core';
import { materialModule } from '../../../material.imports';
import { SubjectService } from '../../../services/subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  imports: [materialModule],
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css',
})
export class ViewCategoriesComponent {
  subjects: any[] = [];
  constructor(private categoryService: SubjectService) {
    this.categoryService.listSubjects().subscribe(
      (data: any) => {
        this.subjects = data;
        console.log(this.subjects);
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
}
