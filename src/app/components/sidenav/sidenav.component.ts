import { Component, computed, Input, signal } from '@angular/core';
import { materialImports } from '../../material.imports';
import { LoginService } from '../../services/login.service';

export type MenuItem = {
  name: string;
  icon: string;
  route: string;
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
  
  ngOnInit() {
    this.rolName = this.user?.rols?.[0]?.nameRol || 'null';
    this.menuItems = signal<MenuItem[]>([
      { name: 'Profile', icon: 'people', route: '/'+this.rolName+'/profile' },
      { name: 'Users', icon: 'people', route: '/users' },
      { name: 'Products', icon: 'shopping_cart', route: '/products' },
      { name: 'Orders', icon: 'receipt', route: '/orders' },
      { name: 'Settings', icon: 'settings', route: '/settings' },
    ]);
  }

  constructor(
    private loginservice: LoginService
  ) {
    this.user = this.loginservice.getUser();
  }


  

  sideNavCollapsed = signal(false);
  @Input() set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
  }

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : '100'));
}
