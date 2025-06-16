import { Component, OnDestroy } from '@angular/core';
import { materialImports } from '../../material.imports';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnDestroy {
  user: any;

  private readonly destroy$ = new Subject<void>();

  constructor(private login: LoginService) {
    this.user = this.login.getUser();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
