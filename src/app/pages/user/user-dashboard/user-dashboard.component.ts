import { Component } from '@angular/core';
import { materialModule } from '../../../material.imports';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SubjectService } from '../../../services/subject.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-dashboard',
  imports: [materialModule, SidebarComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent {
  subjects: any;

  constructor(){}
}
