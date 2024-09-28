import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@app/shared/shared.module';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { ListItemDialogComponent } from './list-item-dialog.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


describe('ListItemDialogComponent', () => {
  let component: ListItemDialogComponent;
  let fixture: ComponentFixture<ListItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ListItemDialogComponent],
    imports: [BrowserAnimationsModule,
        SharedModule,
        RouterModule.forRoot([]),
        RouterTestingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: TranslateFakeLoader
            }
        })],
    providers: [{
            provide: MAT_DIALOG_DATA,
            useValue: {
                listItem: {
                    itemId: 'laskdjjf'
                }
            }
        },
        { provide: MatDialogRef, useValue: {} }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
