import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { TeacherDashboardComponent } from './pages/teacher/teacher-dashboard/teacher-dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path:'register',
        component:SignupComponent,
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent,
        pathMatch:'full'
    },
    {
        path:'admin',
        component: AdminDashboardComponent,
        pathMatch:'full'
    },
    {
        path:'user',
        component: UserDashboardComponent,
        pathMatch:'full'
    },
    {
        path: 'teacher',
        component: TeacherDashboardComponent,
        pathMatch: 'full'
    } 
];
