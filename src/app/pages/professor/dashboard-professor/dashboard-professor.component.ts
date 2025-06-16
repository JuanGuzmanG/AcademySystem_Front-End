import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { materialImports } from '../../../material.imports';

@Component({
  selector: 'app-dashboard-professor',
  standalone: true,
  imports: [CommonModule,materialImports()],
  templateUrl: './dashboard-professor.component.html',
  styleUrl: './dashboard-professor.component.css'
})
export class DashboardProfessorComponent {
  
}
