import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, effect, input, output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MyCustomPaginatorIntl } from './paginator.es.intl';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, DatePipe, DecimalPipe, CurrencyPipe],
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
  templateUrl: './custom-table.component.html',
  styles: ``
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
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  action(name, data) {
    this.actionClick.emit({ name, data })
  }
}
