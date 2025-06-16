import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { materialImports } from '../../../material.imports';
import { UserService } from '../../../services/user.service';
import { LoginService } from '../../../services/login.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css',
})
export class ViewUsersComponent {
  users: any[] = [];
  userlogged: any;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private loginService: LoginService,
    private userService: UserService
  ) {
    this.userlogged = this.loginService.getUser();
    this.userService.getusers().subscribe((data: any) => {
      this.users = data.filter(
        (user: any) => user.document !== this.userlogged.document
      );
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  displayedColumns: string[] = ['document', 'name', 'email', 'role', 'actions'];

  deleteUser(userId: any) {
    this.userService.deleteUser(userId).subscribe(() => {
      this.users = this.users.filter((user) => user.document !== userId);
      Swal.fire('Deleted!', 'User has been deleted.', 'success');
    });
  }
}
