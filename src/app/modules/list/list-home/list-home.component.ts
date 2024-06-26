import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '@app/core/auth/account.service';
import { User } from '@app/core/auth/user.model';
import { ConfirmDialogComponent } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { List } from '../list.model';
import { ListService } from '../list.service';
import { ShareComponent } from '../share/share.component';
import { ListEditComponent } from './edit/list-edit.component';
import { environment } from 'src/environments/environment'
import { HomeService } from '@app/core/home/home.service';

@Component({
  selector: 'app-list-home',
  templateUrl: './list-home.component.html'
})
export class ListHomeComponent implements OnInit {
  user: User;
  userLists: any;
  apiUrl: string;

  constructor(
    public dialog: MatDialog,
    private listService: ListService,
    private accountService: AccountService,
    public readonly homeService: HomeService
  ) {
    this.userLists = this.listService.userListsSubject;
    this.user = this.accountService.sessionValue.user;
    this.apiUrl = environment.apiUrl;
  }

  ngOnInit(): void {
    this.listService.getUserLists();
    const navigation = {
      title: 'Shopitify',
      list: null
    };
    this.homeService.navigationSubject.next(navigation);
  }

  public onEdit(list: List) {
    const dialogRef = this.dialog.open(ListEditComponent, {data: {list, isAddMode: false}});

    dialogRef.afterClosed().subscribe(list => {
      this.listService.getUserLists();
    });
  }

  public onDelete(listId: string) {
    const message = 'Deseas borrar la lista';
    const title = 'Borrar lista';
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {message, title}});

    dialogRef.afterClosed().subscribe(isConfirmed => {
      if (isConfirmed) {
        this.listService.deleteList(listId).subscribe(res => {
          this.listService.getUserLists();
        });
      } else {
        console.info('closed without confirm');
      }
    })
  }

  public addList() {
    const dialogRef = this.dialog.open(ListEditComponent, {data: {isAddMode: true}});

    dialogRef.afterClosed().subscribe(list => {
      console.info('The list edit dialog was closed', list);
      this.listService.getUserLists();
    });
  }

  public onShare(listId: string) {
    const dialogRef = this.dialog.open(ShareComponent, {data: {listId}});

    dialogRef.afterClosed().subscribe(res => {
      console.info('The share dialog was closed', res);
      this.listService.getUserLists();
    });

  }
}
