import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { TeacherDashboardComponent } from './pages/teacher/teacher-dashboard/teacher-dashboard.component';
import { userGuard } from './services/user.guard';
import { adminGuard } from './services/admin.guard';
import { teacherGuard } from './services/teacher.guard';
import path from 'path';
import { profile } from 'console';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeAdminComponent } from './pages/admin/welcome-admin/welcome-admin.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';

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
        path:'user',
        component:UserDashboardComponent,
        pathMatch:'full',
        canActivate: [userGuard]
    },
    {
        path:'admin',
        component:AdminDashboardComponent,
        canActivate: [adminGuard],
        children: [
            {
                path:'profile',
                component: ProfileComponent,
            },
            {
                path:'',
                component: WelcomeAdminComponent,
            },
            {
                path:'categories',
                component: ViewCategoriesComponent,
            }
        ]
    },
    {
        path:'teacher',
        component:TeacherDashboardComponent,
        pathMatch:'full',
        canActivate: [teacherGuard]
    }
];
