import {
  Component,
  computed,
  Input,
  signal,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject as RxjSubject } from 'rxjs';

import { materialImports } from '../../material.imports';
import { LoginService } from '../../services/login.service';
import { SubjectService } from '../../services/subject.service';
import { Rol, User } from '../../interfaces/User.interface';
import { Subject } from '../../interfaces/Subject.interface';

export type MenuItem = {
  name: string;
  icon: string;
  route?: string;
  action?: () => void;
};

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, materialImports()],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent implements OnInit, OnDestroy {
  user: User | null = null;
  rols: Rol[] = [];
  rolName: any;
  menuItems: any;
  subjects: Subject[] = [];

  private readonly destroy$ = new RxjSubject<void>();

  constructor(
    private loginservice: LoginService,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.user = this.loginservice.getUser();
    this.subjectService.listSubjects().subscribe((data) => {
      this.subjects = data;
    });

    this.rolName = this.loginservice.getUserRole()?.toLocaleLowerCase();

    switch (this.rolName) {
      case 'admin':
        this.menuItems = signal<MenuItem[]>([
          { name: 'Welcome', icon: 'home', route: '/' + this.rolName },
          {
            name: 'Profile',
            icon: 'person',
            route: '/' + this.rolName + '/profile',
          },
          {
            name: 'Tests',
            icon: 'menu_book',
            route: '/' + this.rolName + '/view-tests',
          },
          {
            name: 'Subjects',
            icon: 'checklist',
            route: '/' + this.rolName + '/subjects',
          },
          {
            name: 'Users',
            icon: 'people',
            route: '/' + this.rolName + '/users',
          },
        ]);
        break;
      case 'professor':
        this.menuItems = signal<MenuItem[]>([
          { name: 'Welcome', icon: 'home', route: '/' + this.rolName },
          {
            name: 'Profile',
            icon: 'person',
            route: '/' + this.rolName + '/profile',
          },
          {
            name: 'Tests',
            icon: 'menu_book',
            route: '/' + this.rolName + '/' + 0,
          },
        ]);
        break;
      case 'user':
        this.menuItems = signal<MenuItem[]>([
          { name: 'Welcome', icon: 'home', route: '/' + this.rolName },
          {
            name: 'Profile',
            icon: 'person',
            route: '/' + this.rolName + '/profile',
          },
          {
            name: 'Tests',
            icon: 'menu_book',
            route: '/' + this.rolName + '/' + 0,
          },
        ]);
        break;
      default:
        this.menuItems = signal<MenuItem[]>([]);
        break;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout() {
    this.loginservice.logout();
    window.location.reload();
  }

  sideNavCollapsed = signal(false);
  @Input() set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
  }

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : '100'));
}
