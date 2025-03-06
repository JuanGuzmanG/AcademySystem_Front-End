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
  Controldocument  = new FormControl('',[Validators.required])
  ControllastName = new FormControl('',[Validators.required])
  ControlPassword = new FormControl('',[Validators.required,Validators.minLength(8)])
  DTControl = new FormControl('', [Validators.required]);
  BTControl = new FormControl('');
  EmailControl = new FormControl('',[Validators.required, Validators.email]);
  types = ['Cedula', 'Identity Card', 'Passport', 'PPT'];
  BT = ['-','A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

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
  
  constructor(private userService:UserService, private snack:MatSnackBar,
    private http: HttpClient){}
  
  ngOnInit() {
    this.getCountries();
  }
  
  countries: string[] = [];
  getCountries() {
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe(data => {
      this.countries = data.map(country => country.name.common).sort();
    },
    (error)=>{
      console.error('error library')
    }
  );
  }

  formSubmit(){
    if(this.user.gender===''){
      this.user.gender=this.customgender;
    }
    
    if(this.user.document==='' || this.DTControl.invalid || this.user.firstName===''
      || this.user.lastName==='' || this.EmailControl.invalid || this.ControlPassword.invalid){
        
        this.snack.open('fill out the required fields','OK',{
          duration: 3000,
          verticalPosition: 'top'
        })
        return;
      }
    
    this.userService.addUser(this.user).subscribe(
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

  clear(){
    this.user = {
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
  }
}
