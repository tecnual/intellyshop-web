import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountModule } from '@app/core/account/account.module';
import { AccountService } from '@app/core/account/account.service';
import { LoginResponse } from '@app/core/account/login/login-response.dto';

import { ListHomeComponent } from './list-home.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

class AccountServiceMock {
  public get sessionValue(): any {
    return { user: {id: 'asdf', name: 'test'}, token: 'slkjdfl'};
  }
}
describe('ListHomeComponent', () => {
  let component: ListHomeComponent;
  let fixture: ComponentFixture<ListHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ListHomeComponent],
    imports: [RouterModule.forRoot([]),
        RouterTestingModule],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: AccountService, useValue: new AccountServiceMock() },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
