import { Component } from '@angular/core';
import { materialModule } from '../../../material.imports';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-admin-dashboard',
  imports: [materialModule,SidebarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor() { }
}
