import { Component } from '@angular/core';
import { materialModule } from '../../material.imports';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-login',
  imports: [materialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData={
    username:"",
    password:""
  }

  constructor(private snak:MatSnackBar, private loginService:LoginService){}
  
  clear(){
    
  }
  

  forSubmit(){
    if(this.loginData.username==""||this.loginData.username==null){
      this.snak.open("username empty","OK"){
        duration:3000
      }
      return
    }else if(this.loginData.password==""||this.loginData.password==null){
      this.snak.open("password empty","OK"){
        duration:3000
      }
      return
    }

    this.loginService.generateToken(this.loginData).subscribe
  }
}
