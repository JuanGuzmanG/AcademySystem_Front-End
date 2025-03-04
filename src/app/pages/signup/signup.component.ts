import { Component } from '@angular/core';
import { materialModule } from '../../material.imports';
import Swal from 'sweetalert2';
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
  
  public customgender='';
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
    if(this.user.gender===''){
      this.user.gender=this.customgender;
    }
    if(this.user.document == '' || this.user.document == null){
      this.snack.open("document is required", "OK",{
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }
    console.log("submit: ",this.user)
    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log("userservice: ",this.user)
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
