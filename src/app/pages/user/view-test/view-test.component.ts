import { Component } from '@angular/core';
import { TestService } from '../../../services/test.service';
import { ActivatedRoute } from '@angular/router';
import { materialImports } from '../../../material.imports';

@Component({
  selector: 'app-view-test',
  imports: [materialImports()],
  templateUrl: './view-test.component.html',
  styleUrl: './view-test.component.css'
})
export class ViewTestComponent {
  test:any;
  testId: number = 0;

  constructor(
    private testService: TestService,
    private route: ActivatedRoute
  ){
    this.testId = this.route.snapshot.params['testId'];
    this.test = this.testService.getTest(this.testId).subscribe((data) => {
      this.test = data;
    });

  }


}
