import { Component } from '@angular/core';
import { materialImports } from '../../../material.imports';
@Component({
  selector: 'app-admin-dashboard',
  imports: [materialImports()],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor() { }
}
