import {
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { materialImports } from './material.imports';
import { LoginService } from './services/login.service';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSidenav } from '@angular/material/sidenav';

export type MenuItem = {
  name: string;
  icon: string;
  route?: string;
  action?: () => void;
};
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, materialImports(), CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  private breakpointObserver = inject(BreakpointObserver);
  private destroyRef = inject(DestroyRef);
  title = 'SystemAcademy_FE';
  isLoggedIn = false;
  user: any = null;
  role: any = null;
  collapsed = signal(false);
  sideNavWidth = computed(() => (this.collapsed() ? '58px' : '250px'));
  isHandset = signal(false);
  constructor(public login: LoginService, public router: Router) {
    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        this.isHandset.set(result.matches);
      });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
      this.role = this.login.getUserRole();
    });
    if (!this.isLoggedIn) {
      this.collapsed.set(true);
    }
  }

  toggleSidenav() {
    if (this.isHandset()) {
      this.sidenav.toggle();
    } else {
      this.collapsed.set(!this.collapsed());
    }
  }

  handleSidenavClick(): void {
    if (this.isHandset()) {
      this.sidenav.close();
    } else {
      if (!this.collapsed()) {
        this.collapsed.set(true);
      }
    }
  }

  public logout() {
    this.login.logout();
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
