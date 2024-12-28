import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { User } from '../user.model';
import { MatDialog } from '@angular/material/dialog';
import { RegisteredComponent } from '../registered/registered.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', Validators.required]
    }, {validator: this.checkPasswords });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  public register() {
    const user: User = new User(this.f.username.value, this.f.password.value, this.f.name.value, this.f.email.value);
    this.accountService.register(user).subscribe(res => {
      const dialogRef = this.dialog.open(RegisteredComponent, {
        autoFocus: false,
        data: {user}
      });
      dialogRef.afterClosed().subscribe(data => {
        this.router.navigate(['/']);
      });
    });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.get('password').value;
    const confirmPass = group.get('rePassword').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
