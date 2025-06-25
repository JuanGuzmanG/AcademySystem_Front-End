import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { materialImports } from '../../../material.imports';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule,materialImports()],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent {
  constructor(){}
}
