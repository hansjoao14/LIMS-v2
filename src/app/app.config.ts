import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { registerLocaleData } from '@angular/common';
import { environment } from '../environments/environment';
import localeEsEc from '@angular/common/locales/es-EC';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { provideApollo, APOLLO_NAMED_OPTIONS } from 'apollo-angular';
import { provideHttpClient } from '@angular/common/http';

registerLocaleData(localeEsEc);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideToastr({
      progressAnimation: 'increasing',
      timeOut: 5000,
      progressBar: true,
    }),

    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        link: httpLink.create({ uri: environment.graphql }),
        cache: new InMemoryCache(),
      };
    }),

    {
      provide: APOLLO_NAMED_OPTIONS,
      useFactory: (httpLink: HttpLink) => ({
        catalogo: {
          link: httpLink.create({ uri: environment.graphql_catalogo }),
          cache: new InMemoryCache(),
        },
        establecimiento: {
          link: httpLink.create({ uri: environment.graphql_establecimiento }),
          cache: new InMemoryCache(),
        },
        reportes: {
          link: httpLink.create({ uri: environment.graphql_reportes }),
          cache: new InMemoryCache(),
        },
      }),
      deps: [HttpLink],
    },
  ]
};