import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

import { UserService } from '../../../services/user.service';
import { materialImports } from '../../../material.imports';
import { RolService } from '../../../services/rol.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  userId: any;
  user: any;
  countries: string[] = [];
  types = ['Cedula', 'Identity Card', 'Passport', 'PPT'];
  BT = ['-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  customGender = '';
  genders = ['Male', 'Female', "I'd rather not say"];
  rol: any;
  rols: any[] = [];
  selectedRols: any[] = [];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute = inject(ActivatedRoute),
    private readonly userService: UserService = inject(UserService),
    private readonly http: HttpClient = inject(HttpClient),
    private readonly router: Router = inject(Router),
    private readonly fb: FormBuilder = inject(FormBuilder),
    private readonly rolservice: RolService = inject(RolService),
    private readonly location: Location = inject(Location)
  ) {}

  ngOnInit() {
    this.getCountries();
    this.userId = this.route.snapshot.params['userId'];

    this.userForm = this.fb.group({
      documentType: ['', Validators.required],
      document: ['', Validators.required],
      username: [''],
      password: [''],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      secondLastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      gender: ['', Validators.required],
      customGender: ['', Validators.maxLength(20)],
      countryBirth: ['', Validators.required],
      bloodType: [''],
      birthDate: ['', Validators.required],
      rols: [[], Validators.required],
    });

    this.rolservice.getAllRols().subscribe(
      (rolData: any) => {
        this.rols = rolData;

        this.userService.get(this.userId).subscribe((user: any) => {
          user.rols = user.rols ?? [];
          this.user = user;
          if (!this.genders.includes(user.gender)) {
            this.customGender = user.gender;
            user.gender = 'Other';
          }

          const selectedRols = this.rols.filter((rol: any) =>
            user.rols.some((r: any) => r.rolId === rol.rolId)
          );

          this.userForm.patchValue({
            documentType: user.documentType,
            document: user.document,
            username: user.document,
            firstName: user.firstName,
            password: user.password,
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
            rols: selectedRols,
          });
        });
      },
      (error) => console.error(error)
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goBack() {
    this.location.back();
  }

  getCountries() {
    this.http
      .get<any[]>('https://restcountries.com/v3.1/all?fields=name')
      .subscribe(
        (data) => {
          this.countries = data.map((c) => c.name.common).sort();
        },
        (error) => {
          console.error('Error fetching countries');
        }
      );
  }

  updateUser() {
    if (this.userForm.invalid) {
      Swal.fire('Error', 'Fill out the required fields', 'error');
      return;
    }

    const customGenderValue = this.userForm.get('customGender')?.value;
    if (this.userForm.get('gender')?.value === 'Other' && customGenderValue) {
      this.userForm.patchValue({ gender: customGenderValue });
    }
    const formValue = this.userForm.value;
    if (formValue.gender === 'Other' && formValue.customGender === '') {
      formValue.gender = formValue.customGender;
    }

    delete formValue.customGender;
    this.userService.updateUser(this.userId, formValue).subscribe(
      () => {
        this.router.navigate(['/admin/users']);
        Swal.fire('Success', 'User updated successfully', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Something went wrong', 'error');
      }
    );
  }
}
