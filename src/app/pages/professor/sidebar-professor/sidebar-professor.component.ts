import { Component } from '@angular/core';
import { materialImports } from '../../../material.imports';
import { SubjectService } from '../../../services/subject.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar-professor',
  imports: [materialImports()],
  templateUrl: './sidebar-professor.component.html',
  styleUrl: './sidebar-professor.component.css'
})
export class SidebarProfessorComponent {
    subjects: any[] = [];
    constructor(
      private subjectService: SubjectService,
      private snack: MatSnackBar
    ) {
      this.subjectService.listSubjects().subscribe(
        (data: any) => {
          this.subjects = data;
        },
        (error) => {
          this.snack.open('Error in loading subjects', 'OK', {
            duration: 3000,
          });
        }
      );
    }
}
