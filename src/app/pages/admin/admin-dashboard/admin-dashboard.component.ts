import { Component } from '@angular/core';
import { materialImports } from '../../../material.imports';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-admin-dashboard',
  imports: [materialImports(),SidebarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor() { }
}
