import { Component } from '@angular/core';
import { materialImports } from '../../material.imports';
import { LoginService } from '../../services/login.service';
import { error } from 'console';

@Component({
  selector: 'app-profile',
  imports: [materialImports()],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user:any = null;
  constructor(private loginservice:LoginService) {
    this.user = loginservice.getUser();
  }

  
  
}
