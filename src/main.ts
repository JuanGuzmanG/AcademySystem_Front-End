import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { MATERIAL_IMPORTS } from './app/material.imports';

bootstrapApplication(AppComponent, {
  providers: [
    appConfig.providers,
    MATERIAL_IMPORTS
  ]
})
  .catch((err) => console.error(err));
