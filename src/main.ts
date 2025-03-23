import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { materialModule } from './app/material.imports';
import { authInterceptorProviders } from './app/services/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideHttpClient(withFetch()),
    materialModule,
    authInterceptorProviders
  ],
})
  .catch((err) => console.error(err));
