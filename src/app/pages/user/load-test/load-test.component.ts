import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from '../../../services/test.service';
import { materialModule } from '../../../material.imports';

@Component({
  selector: 'app-load-test',
  imports: [materialModule],
  templateUrl: './load-test.component.html',
  styleUrl: './load-test.component.css',
})
export class LoadTestComponent {
  subjectId: any;
  tests: any;
  constructor(private route: ActivatedRoute, private testService: TestService) {
    this.route.params.subscribe((params) => {
      this.subjectId = params['subjectID'];

      if (this.subjectId == 0) {
        console.log('Load test for all subjects');
        this.testService.listTestByState().subscribe(
          (data) => {
            this.tests = data;
          },
        (error)=>{console.log(error);});
      } else {
        this.testService.listTestsBySubjectId(this.subjectId).subscribe(
          (data) => {
            this.tests = data;
          }
        ,(error)=>{console.log(error);});
      }
    });    
  }
}
