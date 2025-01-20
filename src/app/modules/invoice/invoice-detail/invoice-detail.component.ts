import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemService } from '@app/modules/item/item.service';
import { ScannerDialogComponent } from '@app/modules/scanner/item-scanner-dialog/scanner-dialog.component';
import { SharedModule } from '@app/shared/shared.module';
import { Invoice, InvoiceLine } from '../invoice.model';
import { OpenFoodFactsService } from '@app/modules/open-food-facts/open-food-facts.service';
import { ItemComponent } from '@app/modules/item/item.component';
import { EditLineComponent } from './edit-line.component';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './invoice-detail.component.html',
  styles: ``
})
export class InvoiceDetailComponent {
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<InvoiceDetailComponent>,
    private itemService: ItemService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  /**
   * Open scanner embebed app
   */
  public openScanner(line: InvoiceLine) {
    const dialogRef = this.dialog.open(ScannerDialogComponent);

    dialogRef.afterClosed().subscribe((barcode) => {
      if (barcode) {
        line.barcode = barcode;
        this.processBarcode(this.data.invoice._id, line);
      } else {
        console.info('Botón cerrar pulsado');
      }
    });
  }

    /**
   * Open scanner embebed app
   */
    public openEditLine(line: InvoiceLine) {
      this.dialog.open(EditLineComponent, {
        data: {
          line,
          invoiceId: this.data.invoice._id
        }
      });
    }
  /**
   * Process barcode data on list
   * @param barcode
   * @returns
   */
  private async processBarcode(invoiceId: string, line: InvoiceLine) {
    this.snackBar.open('Codigo de barras: ' + line.barcode, 'Close', {
      duration: 3000
    });
    await this.itemService.setInvoiceLineBarcode(invoiceId, line).subscribe( res => {
      line = res.data;
    });
    }
    openItemDetail(line) {
      const dialogRef = this.dialog.open(ItemComponent, {
        autoFocus: false,
        panelClass: 'custom-dialog-container',
        data: {
          itemId: line.item_id._id
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.info('The dialog was closed', result);
      });
    }
}
