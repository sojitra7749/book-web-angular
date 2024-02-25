import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  NoopAnimationsModule,
  provideAnimations
} from '@angular/platform-browser/animations';
import { Routes, provideRouter, withComponentInputBinding } from '@angular/router';

import { HttpErrorInterceptor, HttpTokenInterceptor } from '@interceptors/http.interceptor';
import { appRoutes } from '@routes/app.routes';
import { authRoutes } from '@routes/auth.routes';

const routes: Routes = [
  ...authRoutes,
  ...appRoutes,
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        HttpTokenInterceptor,
        HttpErrorInterceptor
      ])
    ),
    provideRouter(
      routes,
      withComponentInputBinding()
    ),
    importProvidersFrom(
      BrowserModule,
      NoopAnimationsModule
    ),
    { provide: 'STORAGE', useFactory: getStorage },
  ],
};

export function getStorage() {
  return typeof window !== 'undefined' ? window.localStorage : null;
}
