import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { userGuard } from './services/guards/user.guard';
import { adminGuard } from './services/guards/admin.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeAdminComponent } from './pages/admin/welcome-admin/welcome-admin.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewTestsComponent } from './pages/admin/view-tests/view-tests.component';
import { AddTestComponent } from './pages/admin/add-test/add-test.component';
import { UpdateTestComponent } from './pages/admin/update-test/update-test.component';
import { ViewTestQuestionsComponent } from './pages/admin/view-test-questions/view-test-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { LoadTestComponent } from './pages/user/load-test/load-test.component';
import { WelcomeUserComponent } from './pages/user/welcome-user/welcome-user.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartTestComponent } from './pages/user/start-test/start-test.component';
import { ViewTestComponent } from './pages/user/view-test/view-test.component';
import { ViewUsersComponent } from './pages/admin/view-users/view-users.component';
import { UpdateUserComponent } from './pages/admin/update-user/update-user.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { professorGuard } from './services/guards/professor.guard';
import { DashboardProfessorComponent } from './pages/professor/dashboard-professor/dashboard-professor.component';
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
        canActivate: [userGuard],
        children: [
            {
                path:'',
                component: WelcomeUserComponent
            },
            {
                path:'profile',
                component:ProfileComponent,
            },
            {
                path:'profile/update/:userId',
                component: UpdateProfileComponent,
            },
            {
                path:':subjectID',
                component: LoadTestComponent
            },
            {
                path:'view-test/:testId',
                component: ViewTestComponent
            },
            {
                path:'instructions/:testId',
                component: InstructionsComponent
            },
            {
                path:'instructions/start/test/:testId',
                component: StartTestComponent, 
                canActivate: [userGuard]
            }
        ]
    },
    {
        path:'start/test/:testId',
        component: StartTestComponent, 
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
                path:'profile/update/:userId',
                component: UpdateProfileComponent,
            },
            {
                path:'',
                component: WelcomeAdminComponent,
            },
            {
                path:'subjects',
                component: ViewCategoriesComponent,
            },
            {
                path:'add-category',
                component: AddCategoryComponent
            },
            {
                path:'view-tests',
                component: ViewTestsComponent,
            },
            {
                path: 'add-test',
                component: AddTestComponent,
            },
            {
                path:'update-test/:testId',
                component: UpdateTestComponent,
            },
            {
                path:'questions/:testName/:testId',
                component: ViewTestQuestionsComponent
            },
            {
                path: 'add-question/:testName/:idTest',
                component: AddQuestionComponent,
            },
            {
                path: 'update-question/:testName/:idTest/:questionId',
                component: UpdateQuestionComponent,
            },
            {
                path:"users",
                component: ViewUsersComponent
            },
            {
                path:'users/update/:userId',
                component: UpdateUserComponent
            }
        ]
    },
    {
        path:'professor',
        component:DashboardProfessorComponent,
        pathMatch:'full',
        canActivate: [professorGuard],
    }
];
