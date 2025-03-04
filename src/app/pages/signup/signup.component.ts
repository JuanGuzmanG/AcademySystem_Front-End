import { Component } from '@angular/core';
import { materialModule } from '../../material.imports';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  imports: [materialModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent{
  
  public customgender='';
  signupForm: FormGroup = new FormGroup({
    documentType: new FormControl('', Validators.required),
    document: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl(''),
    lastName: new FormControl('', Validators.required),
    secondLastName: new FormControl(''),
    birthDate: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    countryBirth: new FormControl(''),
    phoneNumber: new FormControl(''),
    gender: new FormControl(''),
    bloodType: new FormControl(''),
    photo: new FormControl('')
  });
  countries: string[] = [];
  constructor(private userService:UserService, private snack:MatSnackBar,private http: HttpClient){}

  onGenderChange(value: string) {
    this.customgender = value;
    
    if (value !== 'Other') {
      this.signupForm.patchValue({ gender: value });
    } else {
      this.signupForm.patchValue({ gender: '' }); // Se espera que el usuario escriba
    }
  }

  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe(data => {
      this.countries = data.map(country => country.name.common).sort();
    },
    (error)=>{
      alert("error library");
      this.snack.open('restcountries failure','OK',{
        duration: 3000,
        verticalPosition: 'top'
      })
      this.countries = ["colombia","mexico"]
    }
  );
  }

  formSubmit(){
    let user = this.signupForm.value
    if(!user.gender){
      user.gender=this.customgender;
    }
    if(this.signupForm.invalid){
      this.snack.open("Complete all required fields","OK")
    }
    this.userService.addUser(user).subscribe(
      (data) => {
        Swal.fire('user saved successfully','user saved in the system','success')
      },(error) => {
        this.snack.open('System Error, Try later','OK',{
          duration: 3000,
          verticalPosition: 'top'
        })
      }
    ); 
  }

  DTControl = new FormControl('', [Validators.required]); // 🔹 Control del select
  types = ['Cedula', 'Identity Card', 'Passport', 'PPT'];

  BTControl = new FormControl('', Validators.required);
  BT = ['-','A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
}
