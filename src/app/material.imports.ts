import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports:[MatButtonModule,MatFormFieldModule,MatInputModule,FormsModule],
    exports:[MatButtonModule,MatFormFieldModule,MatInputModule,FormsModule]
})
export class materialModule{}
