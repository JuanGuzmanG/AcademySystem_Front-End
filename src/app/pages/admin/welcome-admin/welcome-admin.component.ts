import { Component } from '@angular/core';
import { materialImports } from '../../../material.imports';

@Component({
  selector: 'app-welcome-admin',
  imports: [materialImports()],
  templateUrl: './welcome-admin.component.html',
  styleUrl: './welcome-admin.component.css'
})
export class WelcomeAdminComponent {
}
