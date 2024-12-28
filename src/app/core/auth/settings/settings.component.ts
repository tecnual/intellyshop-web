import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileSettingsComponent } from "./profile/profile-settings.component";
import { SharedModule } from '@app/shared/shared.module';
import { FireflySettingsComponent } from "./firefly/firefly-settings.component";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatTabsModule, ProfileSettingsComponent, SharedModule, FireflySettingsComponent],
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit{

  ngOnInit(): void {
  }
}
