import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { authInterceptorProviders } from './services/auth.interceptor';

@NgModule({
    imports:[MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatSnackBarModule, 
        MatSelectModule,
        ReactiveFormsModule,
        CommonModule,
        MatRadioModule,
        MatToolbarModule,
        MatCardModule,
        MatIconModule,
        RouterModule,
    ],
    exports:[MatButtonModule,
        MatFormFieldModule,MatInputModule,
        FormsModule,
        MatSnackBarModule,
        MatSelectModule,
        ReactiveFormsModule,
        CommonModule,
        MatRadioModule,
        MatToolbarModule,
        MatCardModule,
        MatIconModule,
        RouterModule,
    ]
})
export class materialModule{}
