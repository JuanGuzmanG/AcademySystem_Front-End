import { Component } from '@angular/core';
import { materialModule } from '../../material.imports';
@Component({
  selector: 'app-login',
  imports: [materialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  clear(){
    
  }
}
