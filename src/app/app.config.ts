import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { registerLocaleData } from '@angular/common';
import { environment } from '../environments/environment';
import localeEsEc from '@angular/common/locales/es-EC';
import { InMemoryCache, ApolloClient } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { provideApollo } from 'apollo-angular';
import { provideHttpClient } from '@angular/common/http';

registerLocaleData(localeEsEc);

// Se elimina el <any> para corregir el error de tipado
export function apolloOptionsFactory(
  httpLink: HttpLink
): ApolloClient.Options { 
  return {
    link: httpLink.create({ uri: environment.graphql }),
    cache: new InMemoryCache(),
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Fundamental para que el renderizado automático detecte cambios
    provideZoneChangeDetection({ eventCoalescing: true }),
  
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideToastr({
      progressAnimation: 'increasing',
      timeOut: 5000,
      progressBar: true,
    }),

    // Se eliminó provideClientHydration para evitar el error NG0505
    provideApollo(() => apolloOptionsFactory(inject(HttpLink))),
  ]
};