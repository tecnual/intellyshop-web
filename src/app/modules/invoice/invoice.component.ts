import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../list/list.service';
import { List } from '../list/list.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { CustomTableComponent } from "../../shared/components/custom-table/infrastructure/custom-table.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomTable, CustomTableColumn, CustomTableColumnType } from '@app/shared/components/custom-table/domain/custom-table';
import { Invoice } from './invoice.model';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [SharedModule, CommonModule, CustomTableComponent],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent {
  list: List;
  displayedColumns: string[] = ['number', 'date', 'total'];
  tableSource: CustomTable<Invoice>;
  dialogRef: MatDialogRef<AddInvoiceComponent>;

  private _snackBar = inject(MatSnackBar);
  constructor(
    private readonly route: ActivatedRoute,
    private readonly listService: ListService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.listService.list.subscribe(list => {
        if(list) {
          this.list = list;
        } else {
          this.listService.getUserLists(params.listId);
        }
        this.generateDatasource(list?.invoices);
      })
    });

  }
  generateDatasource(invoices) {
    const columns: CustomTableColumn[] = [
      {
        name: 'number',
        label: 'No.',
        type: CustomTableColumnType.NUMBER
      },
      {
        name: 'date',
        label: 'Fecha',
        type: CustomTableColumnType.DATE
      },
      {
        name: 'total',
        label: 'Total',
        type: CustomTableColumnType.CURRENCY
      }
    ];
    if (invoices && invoices.length > 0) {
      invoices.sort((a, b) => (a.date < b.date ? 1 : -1));
      this.tableSource = new CustomTable(invoices);
      this.tableSource.columns = columns;
    }
  }
  onInvoiceClick (invoice) {
    this.dialog.open(InvoiceDetailComponent, {
      autoFocus: false,
      data: {invoice}
    })
  }
  addInvoice() {
    this.dialogRef = this.dialog.open(AddInvoiceComponent, {
     autoFocus: false,
     data: { list: this.list }
    });

    this.dialogRef.afterClosed().subscribe( data => {
      // console.log('Dialog closed: ', data);
    })
  }


  tableAction(action) {
    switch (action.name) {
      case 'onInvoiceClick': {
        this.onInvoiceClick(action.data);
        break;
      }
      default:
        this.openSnackBar('No se ha podido realizar la acción', 'cerrar');
        break;
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
