import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { materialImports } from '../../material.imports';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  countries: string[] = [];
  types = ['Identity Card', 'Passport', 'PPT'];
  BT = ['-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  Genders = ['Male', 'Female', "I'd rather not say", 'Other'];
  customGender = '';
  signupForm: FormGroup;
  selectedFile: File | null = null;
  photoPreview: string | ArrayBuffer | null = null;
  dateLimit = new Date().getFullYear() - 5;

  constructor(
    private readonly userService: UserService = inject(UserService),
    private readonly snack: MatSnackBar = inject(MatSnackBar),
    private readonly http: HttpClient = inject(HttpClient),
    private readonly fb: FormBuilder = inject(FormBuilder),
    private readonly router: Router = inject(Router)
  ) {
    this.getCountries();
    this.signupForm = this.fb.group({
      documentType: ['', Validators.required],
      document: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.maxLength(30)]],
      middleName: ['', Validators.maxLength(30)],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      secondLastName: ['', Validators.maxLength(30)],
      birthDate: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      countryBirth: ['',[Validators.required]],
      phoneNumber: ['', Validators.maxLength(14)],
      gender: [''],
      bloodType: [''],
      customGender: ['', Validators.maxLength(20)],
    });
    this.photoPreview = '/assets/default.jpg';
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.photoPreview = reader.result);
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.selectedFile = null;
      this.photoPreview = null;
    }
  }
  getCountries() {
    this.http
      .get<any[]>('https://restcountries.com/v3.1/all?fields=name')
      .subscribe(
        (data) => {
          this.countries = data.map((c) => c.name.common).sort();
        },
        () => {
          console.error('Error fetching countries');
        }
      );
  }

  formSubmit() {
    const customGenderValue = this.signupForm.get('customGender')?.value;
    if (this.signupForm.get('gender')?.value === 'Other' && customGenderValue) {
      this.signupForm.patchValue({ gender: customGenderValue });
    }
    const dateRegister = new Date(this.signupForm.get('birthDate')?.value);
    if (dateRegister.getFullYear() > this.dateLimit) {
      Swal.fire('Error', 'The age limit is 5 years old', 'error');
      return;
    }
    if (this.signupForm.invalid) {
      this.snack.open('Fill out the required fields', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }
    const userData = { ...this.signupForm.value };
    this.userService
      .addUser(userData, this.selectedFile ?? undefined)
      .subscribe(
        () => {
          Swal.fire(
            'User saved successfully',
            'User saved in the system',
            'success'
          );
          this.router.navigate(['/login']);
        },
        () => {
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
    this.selectedFile = null;
    this.photoPreview = null;
  }
}
