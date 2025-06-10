import { Component } from '@angular/core';
import { materialImports } from '../../material.imports';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

  selectedFile: File | null = null;
  photoPreview: string | ArrayBuffer | null = null;

  constructor(
    private userService: UserService,
    private snack: MatSnackBar,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.getCountries();

    this.signupForm = this.fb.group({
      documentType: ['', Validators.required],
      document: ['', Validators.required],
      firstName: ['',[Validators.required,Validators.maxLength(30)]],
      middleName: ['',Validators.maxLength(30)],
      lastName: ['', [Validators.required,Validators.maxLength(30)]],
      secondLastName: ['',Validators.maxLength(30)],
      birthDate: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      countryBirth: [''],
      phoneNumber: ['',Validators.maxLength(14)],
      gender: [''],
      bloodType: [''],
      customGender: ['',Validators.maxLength(20)],
    });
  }

  onFileSelected(event: Event): void { // Cambiado el tipo de evento a Event
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;

    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
      const reader = new FileReader();
      reader.onload = e => this.photoPreview = reader.result;
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.selectedFile = null;
      this.photoPreview = null;
    }
  }

  getCountries() {
    this.http.get<any[]>('https://restcountries.com/v3.1/all?fields=name').subscribe(
      (data) => {
        this.countries = data.map((c) => c.name.common).sort();
      },
      (error) => {
        console.error('Error fetching countries');
      }
    );
  }

  formSubmit() {
    const customGenderValue = this.signupForm.get('customGender')?.value;
    if (this.signupForm.get('gender')?.value === 'Other' && customGenderValue.trim()) {
      this.signupForm.patchValue({ gender: customGenderValue.trim() });
    }

    if (this.signupForm.invalid) {
      this.snack.open('Fill out the required fields', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }

    const userData = {...this.signupForm.value};
    console.log(userData);
    this.userService.addUser(userData, this.selectedFile ?? undefined).subscribe(
      (data) => {
        console.log("file:"+this.selectedFile);
        console.log("data: "+data);
        Swal.fire('User saved successfully', 'User saved in the system', 'success');
        this.router.navigate(['/login']);
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
    this.selectedFile = null;
    this.photoPreview = null;
  }
}
