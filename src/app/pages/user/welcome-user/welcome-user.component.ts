import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { materialImports } from '../../../material.imports';

@Component({
  selector: 'app-welcome-user',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './welcome-user.component.html',
  styleUrl: './welcome-user.component.css'
})
export class WelcomeUserComponent {

}
