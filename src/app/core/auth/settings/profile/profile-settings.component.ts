import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../../user.model';
import { AccountService } from '../../account.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '@app/shared/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserMapper } from '../../infrastructure/user.rest.mapper';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, SharedModule],
  templateUrl: './profile-settings.component.html'
})
export class ProfileSettingsComponent implements OnInit{
  user: User;
  userForm = signal<FormGroup>(null);
  private snackBar = inject(MatSnackBar);
  private readonly translate = inject(TranslateService);

  languages;
  constructor(
    private readonly accountService: AccountService,
  ) {}

  ngOnInit(): void {
    this.user = this.accountService.sessionValue.user;
    this.languages = [
      { code: 'es', name: 'spanish', icon: 'fi-es' },
      { code: 'en', name: 'english', icon: 'fi-us' }
    ];
    this.initForm();
  }

  onSubmit() {
    const userRequest = new UserMapper().domainToRequest(this.userForm().value);
    if (this.userForm().valid) {
      this.accountService.update(this.user._id, userRequest).subscribe({
        next: () => {
          this.showSnackBar('Tus datos se han actualizado correctamente', 'Cerrar', 4000);
        },
        error: () => {
          this.showSnackBar('Se ha producido un error y tus datos no se han podido actualizar.', 'Cerrar', 4000);
        }
      })
    }
  }

  initForm() {
    this.userForm.set(new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
      username: new FormControl(this.user.username, Validators.required),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      language: new FormControl(this.languages.find(l => l.code === this.user.lang))
    }));
  }

  showSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, { duration });
  }

  changeLanguage(lang): void {
    this.translate.use(lang.code);
  }
}
