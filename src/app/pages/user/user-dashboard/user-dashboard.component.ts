import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
