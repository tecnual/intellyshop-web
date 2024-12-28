import { CurrencyPipe, DatePipe } from '@angular/common';
import { AfterViewInit, Component, effect, input, output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MyCustomPaginatorIntl } from './paginator.es.intl';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, DatePipe, CurrencyPipe],
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
  templateUrl: './custom-table.component.html'
})
export class CustomTableComponent implements AfterViewInit{ // TODO: Hacer genérico
  displayedColumns = input<string[]>();
  tableSource = input<any>();
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  actionClick = output<any>();
  constructor() {
    effect(() => {
      this.dataSource.data = this.tableSource()?.data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

/**
 * The ngAfterViewInit function assigns the paginator to the dataSource.
 */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

/**
 * The `action` function emits an event with the provided `name` and `data`.
 * @param name - The `name` parameter is a string that represents the name of the action being
 * performed.
 * @param data - Data is a variable that holds information or values that are being passed as an
 * argument to the action function. It could be any type of data such as a string, number, object,
 * array, etc.
 */
  action(name, data) {
    this.actionClick.emit({ name, data })
  }
}
