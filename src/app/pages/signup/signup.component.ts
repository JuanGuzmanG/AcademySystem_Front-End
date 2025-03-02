import { Component } from '@angular/core';
import { materialModule } from '../../material.imports';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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
    countryBirth:'',
    phoneNumber:'',
    gender:'',
    customGender:'',
    bloodType:'',
    photo:'',
  }

  countries: string[] = [];
  constructor(private userService:UserService, private snack:MatSnackBar,private http: HttpClient){}

  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe(data => {
      this.countries = data.map(country => country.name.common).sort();
    });
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.document == '' || this.user.document == null){
      this.snack.open("document is required", "OK")
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

  DTControl = new FormControl('', [Validators.required]); // 🔹 Control del select
  types = ['Cedula', 'Identity Card', 'Passport', 'PPT'];

  BTControl = new FormControl('', Validators.required);
  BT = ['-','A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
}
