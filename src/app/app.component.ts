import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { materialImports } from './material.imports';
import { LoginService } from './services/login.service';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SidenavComponent,materialImports()],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})

export class AppComponent {
  title = 'SystemAcademy_FE';
    isLoggedIn = false;
    user:any = null;
    collapsed = signal(false);
    sideNavWidth = computed(() => (this.collapsed() ? '60px' : '250px'));
  
    constructor(public login:LoginService) { }
  
    ngOnInit(): void {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
      this.login.loginStatusSubject.asObservable().subscribe(
        data => {
          this.isLoggedIn = this.login.isLoggedIn();
          this.user = this.login.getUser();
        }
      )
      if (!this.isLoggedIn) {
        this.collapsed.set(true);
      }
    }
    
    public logout(){
      this.login.logout();
      window.location.reload();
    }
}
