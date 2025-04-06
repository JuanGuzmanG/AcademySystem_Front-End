import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { materialModule } from './app/material.imports';
import { authInterceptorProviders } from './app/services/auth.interceptor';
import { NgxUiLoaderComponent, NgxUiLoaderHttpModule } from 'ngx-ui-loader';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideHttpClient(withInterceptorsFromDi()),
    materialModule,
    authInterceptorProviders,
  ],
})
  .catch((err) => console.error(err));
