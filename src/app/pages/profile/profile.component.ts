import { Component } from '@angular/core';
import { materialModule } from '../../material.imports';
import { LoginService } from '../../services/login.service';
import { error } from 'console';

@Component({
  selector: 'app-profile',
  imports: [materialModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user:any = null;
  constructor(private loginservice:LoginService) {
    this.user = loginservice.getUser();
  }

  
  
}
