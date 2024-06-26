import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from '@app/core/auth/account.service';
import { User } from '@app/core/auth/user.model';
import { List } from '../list.model';
import { ListService } from '../list.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html'
})
export class ShareComponent implements OnInit {
  loading = false;
  submitted = false;
  isAddMode: boolean;
  form: FormGroup;
  list: List;
  usersFound: User[] = [];
  listId: string;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private listService: ListService,
    public dialogRef: MatDialogRef<ShareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.listId = data.listId;
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      filter: [""],
      description: ["", Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  public onSubmit() {
    if (this.f['filter'].value._id) {
      this.listService.shareList(this.listId, this.f['filter'].value).subscribe();
    }
  }

  public onClose() {
    this.dialogRef.close(false);
  }

  public getFilteredUsers(filter: Event) {
    const filterValue = (filter.target as HTMLInputElement).value;
    this.accountService.geFilteredUsers(filterValue).subscribe(data => {
      this.usersFound = data;
    })
  }

  public displayUser(user: User): string {
    return user && user.username ? user.username : '';
  }
}
