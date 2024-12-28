import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireflySettingsComponent } from './firefly-settings.component';

describe('FireflySettingsComponent Test', () => {
  let component: FireflySettingsComponent;
  let fixture: ComponentFixture<FireflySettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FireflySettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FireflySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
