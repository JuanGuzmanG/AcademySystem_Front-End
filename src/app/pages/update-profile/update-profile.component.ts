import { Component } from '@angular/core';
import { materialImports } from '../../material.imports';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolService } from '../../services/rol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-profile',
  imports: [materialImports()],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent {
    userForm!: FormGroup;
    userId : any;
    user: any;
    countries: string[] = [];
    types = ['Cedula', 'Identity Card', 'Passport', 'PPT'];
    BT = ['-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    customGender = '';
    genders = ['Male','Female',"I'd rather not say"];
    rol: any;
    rols: any[] = [];
    selectedRols: any[] = [];
    constructor(
      private route: ActivatedRoute,
      private userService: UserService,
      private http: HttpClient,
      private router: Router,
      private fb: FormBuilder,
      private rolservice: RolService
    ){
      this.getCountries();
    }
  
    ngOnInit() {
      this.userId = this.route.snapshot.params['userId'];
  
      this.userForm = this.fb.group({
        documentType: ['', Validators.required],
        document: ['', Validators.required],
        firstName: ['', Validators.required],
        middleName: [''],
        lastName: ['', Validators.required],
        secondLastName: [''],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', Validators.required],
        gender: ['', Validators.required],
        customGender: [''],
        countryBirth: ['', Validators.required],
        bloodType: [''],
        birthDate: ['', Validators.required],
        rols: [[],Validators.required]
      });
      


      this.rolservice.getAllRols().subscribe(
        (rolData: any) => {
          this.rols = rolData;
  
          this.userService.get(this.userId).subscribe((user: any) => {
            user.rols = user.rols ?? [];
    
            if (!this.genders.includes(user.gender)) {
              this.customGender = user.gender;
              user.gender = 'Other';
            }
  
            const selectedRols = this.rols.filter((rol: any) =>
              user.rols.some((r: any) => r.idRol === rol.idRol)
            );
    
            this.userForm.patchValue({
              documentType: user.documentType,
              document: user.document,
              firstName: user.firstName,
              middleName: user.middleName,
              lastName: user.lastName,
              secondLastName: user.secondLastName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              gender: user.gender,
              customGender: this.customGender,
              countryBirth: user.countryBirth,
              bloodType: user.bloodType,
              birthDate: user.birthDate,
              rols: selectedRols
            });
          });
        },
        error => console.error(error)
      );
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
  
    updateUser() {
      
      if(this.userForm.invalid){
        Swal.fire('Error', 'Fill out the required fields', 'error');
        return;
      }
  
      const formValue = this.userForm.value;
  
      if (formValue.gender === 'Other' && formValue.customGender?.trim()) {
        formValue.gender = formValue.customGender.trim();
      }
  
      delete formValue.customGender;
      this.rol = this.selectedRols.map((rol: any) => rol.nameRol);
      this.userService.updateUser(formValue).subscribe(
        () => {
          this.router.navigate(['/'+this.selectedRols[0]+'/profile']);
          Swal.fire('Success', 'User updated successfully', 'success');
        },
        error => {
          console.log(error);
          Swal.fire('Error', 'Something went wrong', 'error');
        }
      );
    }
}
