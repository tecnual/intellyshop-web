import { registerLocaleData } from '@angular/common';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@app/shared/shared.module';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { ListComponent } from './list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
registerLocaleData(localeEs, 'es');

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ListComponent],
    imports: [TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: TranslateFakeLoader
            }
        }),
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        RouterTestingModule,
        SharedModule],
    providers: [{ provide: LOCALE_ID, useValue: 'es' }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
