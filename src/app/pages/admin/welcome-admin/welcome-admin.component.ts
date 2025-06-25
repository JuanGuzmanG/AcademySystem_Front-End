import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { materialImports } from '../../../material.imports';
@Component({
  selector: 'app-welcome-admin',
  standalone: true,
  imports: [CommonModule, materialImports(), CarouselModule],
  templateUrl: './welcome-admin.component.html',
  styleUrl: './welcome-admin.component.css'
})
export class WelcomeAdminComponent {
}
