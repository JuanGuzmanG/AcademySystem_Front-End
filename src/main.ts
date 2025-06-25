import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptorProviders } from './app/services/auth.interceptor';
import { bootstrapApplication } from '@angular/platform-browser';
import { materialImports } from './app/material.imports';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideHttpClient(withInterceptorsFromDi()),
    materialImports(),
    authInterceptorProviders,
  ],
})
  .catch((err) => console.error(err));
