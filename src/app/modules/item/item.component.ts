import { Component, inject, Inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { ItemService } from './item.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item, Price } from './item.model';
import { SharedModule } from '@app/shared/shared.module';
import es from '@angular/common/locales/es';
import { ChartComponent } from "../../shared/components/chart/chart.component";
import moment from 'moment';
import { CustomTableComponent } from "../../shared/components/custom-table/infrastructure/custom-table.component";
import { CustomTable, CustomTableColumn, CustomTableColumnType } from '@app/shared/components/custom-table/domain/custom-table';
import { MatSnackBar } from '@angular/material/snack-bar';

registerLocaleData(es, 'es');
@Component({
  standalone: true,
  selector: 'app-item',
  templateUrl: './item.component.html',
  imports: [SharedModule, CommonModule, ChartComponent, CustomTableComponent]
})
export class ItemComponent implements OnInit {

  tableSource: CustomTable<Price>;
  item: Item = {};
  chartData: { x: string, y: number }[] = [];
  prices: Price[];

  private snackBar = inject(MatSnackBar);

  constructor(
    private itemService: ItemService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit(): void {

    if (this.data.itemId) {
      this.itemService.searchItemById(this.data.itemId).subscribe(async res => {
        this.item = res.data;
        this.prices = res.data.prices.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));

        await this.getPrices(this.item);
        this.chartData = this.prices.map(price => {
          const date = moment(price.date).format('YYYY-MM-DD');
          return { x: date, y: Number(price.price) };
        });
        this.generateTableSource(this.prices);
      });
    }
  }

  getPrices( item: Item) {
    const monthAgo: Date = new Date(new Date().setMonth(new Date().getMonth() -1));

    const lastPriceUpdateDate: Date = new Date(item.lastPriceUpdateDate);
    if (!item.prices || lastPriceUpdateDate?.getTime() < monthAgo.getTime() ) {
      this.itemService.getItemPrices(item._id).subscribe (req => {
        this.prices = req as Price[];
      });
    }
  }
  generateTableSource(prices: Price[]) {
    const columns: CustomTableColumn[] = [
      {
        name: 'date',
        label: 'Fecha',
        type: CustomTableColumnType.DATE
      },
      {
        name: 'price',
        label: 'Precio',
        type: CustomTableColumnType.CURRENCY
      }
    ];
    console.log('Precios: ', prices);
    this.tableSource = new CustomTable<Price>(prices);
    this.tableSource.columns = columns;
  }

  tableAction(action) {
    switch (action.name) {
      default:
        this.openSnackBar('No se ha podido realizar la acción', 'cerrar');
        break;
    }
  }

  openSnackBar(message: string, action: string, duration: number = 4000) {
    this.snackBar.open(message, action, { duration });
  }
}
