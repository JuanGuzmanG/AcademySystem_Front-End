import { Component } from '@angular/core';
import { materialImports } from '../../../material.imports';
import { SidebarProfessorComponent } from '../sidebar-professor/sidebar-professor.component';

@Component({
  selector: 'app-dashboard-professor',
  imports: [materialImports(), SidebarProfessorComponent],
  templateUrl: './dashboard-professor.component.html',
  styleUrl: './dashboard-professor.component.css'
})
export class DashboardProfessorComponent {

}
