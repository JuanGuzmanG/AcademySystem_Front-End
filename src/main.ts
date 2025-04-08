import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { materialImports } from './app/material.imports';
import { authInterceptorProviders } from './app/services/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideHttpClient(withInterceptorsFromDi()),
    materialImports(),
    authInterceptorProviders,
  ],
})
  .catch((err) => console.error(err));
