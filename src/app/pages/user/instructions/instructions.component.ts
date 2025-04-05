import { Component } from '@angular/core';
import { TestService } from '../../../services/test.service';
import { ActivatedRoute } from '@angular/router';
import { materialModule } from '../../../material.imports';

@Component({
  selector: 'app-instructions',
  imports: [materialModule],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css',
})
export class InstructionsComponent {
  test: any;
  testId: any;

  constructor(private testService: TestService, private route: ActivatedRoute) {
    this.testId = this.route.snapshot.params['testId'];
    this.testService.getTest(this.testId).subscribe(
      (data) => {
        this.test = data;

      },
      (error) => {
        console.error('Error fetching test:', error);
      }
    );
  }
}