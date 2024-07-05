import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LayoutComponent } from './layout/layout.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { ConfirmComponent } from './confirm/confirm.component';
import { RegisteredComponent } from './registered/registered.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LayoutComponent, ConfirmComponent, RegisteredComponent],
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
