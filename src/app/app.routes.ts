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
import { ViewsubjectsComponent } from './pages/admin/view-subjects/view-subjects.component';
import { AddCategoryComponent } from './pages/admin/add-subject/add-subject.component';
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
import { ViewTestProfessorComponent } from './pages/professor/view-test-professor/view-test-professor.component';
import { UpdateTestProfessorComponent } from './pages/professor/update-test-professor/update-test-professor.component';
import { ViewTestQuestionsProfessorComponent } from './pages/professor/view-test-questions-professor/view-test-questions-professor.component';
import { UpdateQuestionProfessorComponent } from './pages/professor/update-question-professor/update-question-professor.component';
import { HomeProfessorComponent } from './pages/professor/welcome-professor/welcome-professor.component';
import { AddTestProfessorComponent } from './pages/professor/add-test-professor/add-test-professor.component';
import { AddQuestionProfessorComponent } from './pages/professor/add-question-professor/add-question-professor.component';
import { UpdateSubjectComponent } from './pages/admin/update-subject/update-subject.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'register', component: SignupComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'start/test/:testId',component: StartTestComponent,canActivate: [userGuard]},

    {path: 'user',
    component: UserDashboardComponent,
    canActivate: [userGuard],
    children: [
        { path: '', component: WelcomeUserComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'profile/update/:userId', component: UpdateProfileComponent },
        { path: 'view-test/:testId', component: ViewTestComponent },

        { path: ':subjectID', component: LoadTestComponent },
        { path: 'instructions/:testId', component: InstructionsComponent },
        { path: 'instructions/start/test/:testId',component: StartTestComponent,canActivate: [userGuard]},
        ],
    },
    {path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [adminGuard],
        children: [
        { path: '', component: WelcomeAdminComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'profile/update/:userId', component: UpdateProfileComponent },

        { path: 'view-tests', component: ViewTestsComponent },
        { path: 'subjects', component: ViewsubjectsComponent },
        { path: 'users', component: ViewUsersComponent },
        {path: 'questions/:testName/:testId',component: ViewTestQuestionsComponent,},

        { path: 'add-category', component: AddCategoryComponent },
        { path: 'add-test', component: AddTestComponent },
        {path: 'add-question/:testName/:testId',component: AddQuestionComponent,},

        { path: 'update-subject/:subjectId', component: UpdateSubjectComponent },
        { path: 'update-test/:testId', component: UpdateTestComponent },
        {path: 'update-question/:testName/:testId/:questionId',component: UpdateQuestionComponent},
        { path: 'users/update/:userId', component: UpdateUserComponent },
        ],
    },
    {path: 'professor',
        component: DashboardProfessorComponent,
        canActivate: [professorGuard],
        children: [
        { path: '', component: HomeProfessorComponent},
        { path: 'profile', component: ProfileComponent},
        { path: 'profile/update/:userId', component: UpdateProfileComponent},
        
        { path: ':subjectId', component: ViewTestProfessorComponent},
        { path: 'questions/:testName/:testId',component: ViewTestQuestionsProfessorComponent},

        { path: ':subjectId/add-test',component: AddTestProfessorComponent},
        { path: 'add-question/:testName/:testId',component: AddQuestionProfessorComponent},

        { path: 'update-test/:testId',component: UpdateTestProfessorComponent},
        { path: 'update-question/:testName/:testId/:questionId',component: UpdateQuestionProfessorComponent},
        ],
    },
];
