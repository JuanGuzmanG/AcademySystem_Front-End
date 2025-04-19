import { Component } from '@angular/core';
import { materialImports } from '../../../material.imports';
import { SubjectService } from '../../../services/subject.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-subject',
  imports: [materialImports()],
  templateUrl: './update-subject.component.html',
  styleUrl: './update-subject.component.css'
})
export class UpdateSubjectComponent {
  idSubject:any;
  subject:any;
  constructor(
    private subjectservice: SubjectService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.idSubject = this.route.snapshot.params['subjectId'];
    console.log("id: "+this.idSubject);
    this.subjectservice.getsubjectById(this.idSubject).subscribe((data: any) => {
      this.subject = data;
      console.log(this.subject);
    },
    (error) => {
      console.log(error);
    });
  }

  onSubmit() {
    this.subjectservice.updateSubject(this.subject).subscribe((data: any) => {
      this.router.navigate(['/admin/subjects']);
  });
  }
}
