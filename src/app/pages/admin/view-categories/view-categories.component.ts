import { Component } from '@angular/core';
import { materialModule } from '../../../material.imports';

@Component({
  selector: 'app-view-categories',
  imports: [materialModule],
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent {
  constructor(){}

  categories = [
    { idSubject:1, nameSubject: 'Category 1', descriptionSubject: 'description 1' },
    { idSubject:2, nameSubject: 'Category 2', descriptionSubject: 'description 2' },
    { idSubject:3, nameSubject: 'Category 3', descriptionSubject: 'description 3' },
    { idSubject:4, nameSubject: 'Category 4', descriptionSubject: 'description 4' },
]

}
