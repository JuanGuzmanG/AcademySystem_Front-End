import { materialImports } from '../../../material.imports';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule,materialImports()],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor() { }
}
