import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@app/shared/shared.module';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { FinanceComponent } from './finance.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FinanceComponent', () => {
  let component: FinanceComponent;
  let fixture: ComponentFixture<FinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [FinanceComponent],
    imports: [TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: TranslateFakeLoader
            }
        }),
        SharedModule,
        BrowserAnimationsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
