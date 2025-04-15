import { Component } from '@angular/core';
import { materialImports } from '../../../material.imports';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { LoginComponent } from '../../login/login.component';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-view-users',
  imports: [materialImports()],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
})
export class ViewUsersComponent {
  
  users: any[] = [];
  userlogged: any;
  constructor(
    private loginService: LoginService,
    private userService: UserService) {
    this.userlogged = this.loginService.getUser();
    this.userService.getusers().subscribe((data:any) => {
      this.users = data.filter((user:any) => user.document !== this.userlogged.document);
    })
  }
  
  displayedColumns: string[] = ['document', 'name', 'email', 'role', 'actions'];

  deleteUser(userId: any) {
    this.userService.deleteUser(userId).subscribe(() => {
      this.users = this.users.filter(user => user.document !== userId);
      Swal.fire('Deleted!', 'User has been deleted.', 'success');
    })
  }

}
