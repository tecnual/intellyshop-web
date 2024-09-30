
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, isDevMode } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { HttpClient, HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ScannerModule } from './modules/scanner/scanner.module';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(es, 'es');

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA], imports: [AppRoutingModule,
        BrowserAnimationsModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        CoreModule,
        SharedModule,
        ScannerModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        })], providers: [
        { provide: LOCALE_ID, useValue: 'es' },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
