import { Component, OnInit } from '@angular/core';
import { materialImports } from '../../material.imports';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [materialImports()],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  countries: string[] = [];
  types = ['Cedula', 'Identity Card', 'Passport', 'PPT'];
  BT = ['-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  customGender = '';

  signupForm: FormGroup;

  constructor(
    private userService: UserService,
    private snack: MatSnackBar,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.getCountries();
    this.signupForm = this.fb.group({
      documentType: ['', Validators.required],
      document: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      secondLastName: [''],
      birthDate: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      countryBirth: [''],
      phoneNumber: [''],
      gender: [''],
      bloodType: [''],
      photo: [''],
      customGender: ['']
    });
  }

  getCountries() {
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe(
      (data) => {
        this.countries = data.map((c) => c.name.common).sort();
      },
      (error) => {
        console.error('Error fetching countries');
      }
    );
  }

  formSubmit() {
    console.log(this.signupForm.value);
    if (this.customGender && this.customGender === 'Other') {
      this.signupForm.patchValue({ gender: this.signupForm.get('gender')?.value });
    } else if (this.customGender) {
      this.signupForm.patchValue({ gender: this.customGender });
    }

    if (this.signupForm.invalid) {
      this.snack.open('Fill out the required fields', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }

    this.userService.addUser(this.signupForm.value).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('User saved successfully', 'User saved in the system', 'success');
      },
      (error) => {
        this.snack.open('System Error, Try later', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    );
  }

  clear() {
    this.signupForm.reset();
    this.customGender = '';
  }
}
