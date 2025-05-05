import { Component } from '@angular/core';
import { materialImports } from '../../../material.imports';

@Component({
  selector: 'app-user-dashboard',
  imports: [materialImports()],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent {
  subjects: any;

  constructor(){}
}
