import { Component, inject, Inject } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { InvoiceLine, UnitType } from "../invoice.model";
import { SharedModule } from "@app/shared/shared.module";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ItemComponent } from "@app/modules/item/item.component";
import { InvoiceService } from "../invoice.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-line',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './edit-line.component.html'
})
export class EditLineComponent {
  lineForm: FormGroup;
  line: InvoiceLine;
  units: string[];
  private readonly dialog = inject(MatDialog);
  private readonly invoiceService = inject(InvoiceService);
  private snackBar = inject(MatSnackBar);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditLineComponent>
  ) {
    this.line = data.line;
    this.units = Object.values(UnitType);
    this.lineForm = new FormGroup(
      {
        quantity: new FormControl(data.line.quantity || ''),
        price: new FormControl(data.line.price),
        total: new FormControl(data.line.quantity * data.line.price),
        units: new FormControl(data.line.unitType)
      }
    );
  }

  save() {
    this.line.quantity = this.lineForm.controls['quantity'].value
    this.line.price = this.lineForm.controls['price'].value
    this.line.unitType = this.lineForm.controls['units'].value
    console.log('Line: ', this.line);
    this.invoiceService.setInvoiceLine(this.data.invoiceId, this.line).subscribe({
      next: data => {
        console.log(data);
        this.dialogRef.close();
        this.openSnackBar('La línea se ha modificado correctamente', 'Cerrar');
      },
      error: () => {
        this.openSnackBar('No se ha podido modificar la línea', 'Cerrar');
      }
    })
  }

  onChange(event: HTMLInputElement) {
    const value = Number(event.value);
    const targetValue = this.lineForm.controls['total'].value / value;
    const target = event.id === 'quantity' ? 'price' : 'quantity';
    if (value) this.lineForm.controls[target].setValue(targetValue.toFixed(2));
  }

  openItemDetail() {
    this.dialog.open(ItemComponent, {
      autoFocus: false,
      panelClass: 'custom-dialog-container',
      data: {
        itemId: this.data.item_id._id
      },
    });
  }

  openSnackBar(message: string, action: string, duration = 4000) {
    this.snackBar.open(message, action, { duration });
  }
}
