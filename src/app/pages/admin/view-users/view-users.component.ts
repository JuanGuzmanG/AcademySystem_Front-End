import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

import { materialImports } from '../../../material.imports';
import { LoginService } from '../../../services/login.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [CommonModule, materialImports(), MatPaginator],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css',
})
export class ViewUsersComponent implements OnInit, OnDestroy {
  private loginService = inject(LoginService);
  private userService = inject(UserService);

  private allUsers: any[] = [];
  
  paginatedUsers: any[] = [];

  length = 0;
  pageSize = 6;
  pageSizeOptions = [3, 6, 9, 12];

  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    const userlogged = this.loginService.getUser();
    
    this.userService.getusers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.allUsers = data.filter(
          (user: any) => user.document !== userlogged.document
        );
        this.length = this.allUsers.length;
        this.updatePaginatedUsers();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.updatePaginatedUsers(event.pageIndex);
  }

  private updatePaginatedUsers(currentPage = 0): void {
    const startIndex = currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.allUsers.slice(startIndex, endIndex);
  }

  deleteUser(userId: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(userId)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.allUsers = this.allUsers.filter((user) => user.document !== userId);
            this.length = this.allUsers.length;
            this.updatePaginatedUsers();
            Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
          });
      }
    });
  }
}