import { Component } from '@angular/core';
import { materialImports } from '../../../material.imports';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-user-dashboard',
  imports: [materialImports(), SidebarComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent {
  subjects: any;

  constructor(){}
}
