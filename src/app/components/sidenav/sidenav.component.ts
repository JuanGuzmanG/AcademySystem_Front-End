import { Component, computed, Input, signal } from '@angular/core';
import { materialImports } from '../../material.imports';
import { LoginService } from '../../services/login.service';
import { SubjectService } from '../../services/subject.service';

export type MenuItem = {
  name: string;
  icon: string;
  route?: string;
  action?: () => void;
}

@Component({
  selector: 'app-sidenav',
  imports: [materialImports()],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})

export class SidenavComponent {

  user:any;
  rols:any;
  rolName:any;
  menuItems: any;
  subjects: any;
  ngOnInit() {
    this.rolName = this.user?.rols?.[0]?.nameRol || 'null';
    switch (this.rolName) {
    case 'admin':
      this.menuItems = signal<MenuItem[]>([
        { name: 'Profile', icon: 'persons', route: '/'+this.rolName+'/profile' },
        { name: 'Tests', icon: 'menu_book', route: '/'+this.rolName+'/view-tests' },
        { name: 'Subjects', icon: 'checklist', route: '/'+this.rolName+'/subjects' },
        { name: 'Users', icon: 'people', route: '/'+this.rolName+'/users' },
      ]);
      break;
    case 'professor':
      this.menuItems = signal<MenuItem[]>([
        { name: 'Profile', icon: 'people', route: '/'+this.rolName+'/profile' },
        { name: 'Tests', icon: 'menu_book', route: '/'+this.rolName+'/'+0 },
      ]);
      break;
    case 'user':
      this.menuItems = signal<MenuItem[]>([
        { name: 'Profile', icon: 'people', route: '/'+this.rolName+'/profile' },
        { name: 'Tests', icon: 'menu_book', route: '/'+this.rolName+'/'+0 }
      ]);
      break;
    }
  }

  constructor(
    private loginservice: LoginService,
    private subjectService: SubjectService
  ) {
    this.user = this.loginservice.getUser();
    this.subjectService.listSubjects().subscribe(
      data => {
        this.subjects = data;
      }
    );
  }

  logout(){
    this.loginservice.logout();
    window.location.reload();
  }

  sideNavCollapsed = signal(false);
  @Input() set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
  }

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : '100'));
}
