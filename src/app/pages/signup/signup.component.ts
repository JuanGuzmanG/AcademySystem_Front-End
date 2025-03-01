import { Component } from '@angular/core';
import { materialModule } from '../../material.imports';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  imports: [materialModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent{

  public user = {
    documentType: '',
    document: '',
    firstName: '',
    middleName: '',
    lastName: '',
    secondLastName:'',
    birthDate: '',
    email: '',
    password: '',
    CountryBirth:'',
    phoneNumber:'',
    gender:'',
    bloodType:'',
    photo:'',
    rol: 1
  }

  constructor(private userService:UserService){}

  formSubmit(){
    console.log(this.user);
    if(this.user.document == '' || this.user.document == null){
      alert("document can´t be null");
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data)
        alert("save");
      },(error) => {
        console.log("error: --------------", error);
      }
    );
  }
}
