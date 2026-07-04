import { 
    ApplicationConfig, 
    provideBrowserGlobalErrorListeners
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http'; 
import { provideRouter } from '@angular/router';

import { environment } from '../environments/environment.development';
import { routes } from './app.routes';
import { API_URL } from './core/config/api-url.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes), 
    {
        provide: API_URL,
        useValue: environment.apiUrl,
    },
  ],
};
