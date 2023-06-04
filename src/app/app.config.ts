import {ApplicationConfig} from "@angular/platform-browser";
import {provideRouter} from "@angular/router";
import {appRoutes} from "./app-routing";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient} from "@angular/common/http";
import {LOCALE_ID} from "@angular/core";
import localeRu from '@angular/common/locales/ru';
import {registerLocaleData} from "@angular/common";

registerLocaleData(localeRu);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(),
    {provide: LOCALE_ID, useValue: 'ru' }
  ]
}
