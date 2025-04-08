import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { materialImports } from './material.imports';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent,materialImports()],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})

export class AppComponent {
  title = 'SystemAcademy_FE';
}
