import { Component } from '@angular/core';
import { materialImports } from '../../../material.imports';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-users',
  imports: [materialImports()],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
})
export class ViewUsersComponent {
  
  users: any[] = [];

  constructor(private userService: UserService) {
    this.userService.getusers().subscribe((data:any) => {
      this.users = data;
    })
  }
  
  displayedColumns: string[] = ['document', 'name', 'email', 'role', 'actions'];

  deleteUser(userId: any) {
    console.log(userId);
    this.userService.deleteUser(userId).subscribe(() => {
      Swal.fire('Deleted!', 'User has been deleted.', 'success');
      window.location.reload();
    })
  }

}
