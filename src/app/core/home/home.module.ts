import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { NavigationBarComponent } from '@app/core/home/navigation-bar/navigation-bar.component';
import { SidenavComponent } from '@app/core/home/sidenav/sidenav.component';
import { HomeComponent } from '@app/core/home/home.component';
import { HomeRoutingModule } from './home-routing.module';


const components = [
  NavigationBarComponent,
  SidenavComponent
];
@NgModule({
  declarations: [
    ...components,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ],
  exports: [
    ...components
  ]
})
export class HomeModule { }
