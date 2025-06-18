import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { materialImports } from '../../../material.imports';
@Component({
  selector: 'app-home-professor',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './welcome-professor.component.html',
  styleUrl: './welcome-professor.component.css'
})
export class HomeProfessorComponent {

}
