import { Component } from '@angular/core';
import { materialImports } from '../../../material.imports';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome-admin',
  standalone: true,
  imports: [CommonModule,materialImports()],
  templateUrl: './welcome-admin.component.html',
  styleUrl: './welcome-admin.component.css'
})
export class WelcomeAdminComponent {
}
