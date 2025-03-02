import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
    imports:[MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatSnackBarModule, 
        MatSelectModule,
        ReactiveFormsModule,
        CommonModule,
        MatRadioModule
    ],
    exports:[MatButtonModule,
        MatFormFieldModule,MatInputModule,
        FormsModule,
        MatSnackBarModule,
        MatSelectModule,
        ReactiveFormsModule,
        CommonModule,
        MatRadioModule
    ]
})
export class materialModule{}
