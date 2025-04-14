import { Component } from '@angular/core';
import { materialImports } from '../../../material.imports';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-user',
  imports: [materialImports()],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
  userId : any;
  user: any;
  subjects:any;
  rols: any = [
    { id: 1, name: 'ADMIN' },
    { id: 2, name: 'USER' },
    { id: 3, name: 'PROFESSOR' },
  ]
  countries: string[] = [];
  types = ['Cedula', 'Identity Card', 'Passport', 'PPT'];
  BT = ['-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  customGender = '';
  genders = ['Male','Female',"I'd rather not say"];
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private http: HttpClient,
    private router: Router
  ){
    this.getCountries();
    this.userId = this.route.snapshot.params['userId'];
    this.userService.get(this.userId).subscribe(
      (data)=> {
        this.user = data;
        if(!this.genders.includes(this.user.gender)){
          this.customGender = this.user.gender;
          this.user.gender = 'Other';
        }
        console.log(this.user.countryBirth);
      },
      (error)=>{
        console.log(error);
      }
    )
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
    
    if(this.user.gender==='Other' && this.customGender?.trim()){
      this.user.gender = this.customGender.trim();
    }

    this.userService.updateUser(this.user).subscribe(
      (data) => {
        this.router.navigate(['/admin/view-users']);
        Swal.fire('Success', 'User updated successfully', 'success');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
