import { Component } from '@angular/core';
import { materialImports } from '../../../material.imports';
import { SubjectService } from '../../../services/subject.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  imports: [materialImports()],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent {
  constructor(
    private subjectservice: SubjectService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  subject = {
    nameSubject: '',
    descriptionSubject: '',
  };

  onSubmit() {
    if (this.subject.nameSubject == '' || this.subject.descriptionSubject == '') {
      this.snack.open('Please fill all the fields', 'OK', {
        duration: 3000,
      });
      return;
    }
    this.subjectservice.addSubject(this.subject).subscribe(
      (data: any) => {
        this.subject.nameSubject = '';
        this.subject.descriptionSubject = '';
        Swal.fire('success', 'Category added successfully', 'success');
        this.router.navigate(['/admin/categories']);
      },
      (error) => {
        Swal.fire('error', 'Error in adding category', 'error');
      }
    );
  }
}
