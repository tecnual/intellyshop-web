import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '@app/core/auth/account.service';
import { TranslateService } from '@ngx-translate/core';
import { HomeService } from '../home.service';
import { List } from '@app/modules/list/list.model';
import { ListEditComponent } from '@app/modules/list/list-home/edit/list-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ListService } from '@app/modules/list/list.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html'
})
export class NavigationBarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  list: List;
  public navigation: any;
  constructor(
    private router: Router,
    public readonly homeService: HomeService,
    public readonly listService: ListService,
    public readonly translate: TranslateService,
    private readonly accountService: AccountService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listService.list.subscribe((list) => {
      this.list = list;
    });
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
  }

  logout() {
    this.accountService.logout();
  }
  public onEdit(list: List) {
    const dialogRef = this.dialog.open(ListEditComponent, {
      data: { list, isAddMode: false }
    });

    dialogRef.afterClosed().subscribe((list) => {
      console.info('cerrado', list);
    });
  }
  public onTickets(invoices) {
    this.router.navigate(['/list/' + this.list._id + '/invoice']);
  }

  public openSettings() {
    this.router.navigate(['/account/settings']);
  }
}
