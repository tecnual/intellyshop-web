import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-item-scanner-dialog',
  templateUrl: './scanner-dialog.component.html'
})
export class ScannerDialogComponent {
  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent = new ZXingScannerComponent();
  data: any;
  scannerEnabled = true;
  isChecked = true;
  desiredDevice: MediaDeviceInfo = null;
  torch = false;

  camerasFound: MediaDeviceInfo[];
  camerasNotFound;
  //device: MediaDeviceInfo;
  error;
  failure;
  complete;
  productResult;

  checkoutForm;

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = true;
  model:any;

  constructor(public dialogRef: MatDialogRef<ScannerDialogComponent>) {}

  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  public async onCodeResult(resultString: string) {
    this.scannerEnabled = false;
    this.dialogRef.close(resultString);
    return;
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  public toggleDevice() {
    let index: number = this.availableDevices.indexOf(this.currentDevice);
    index === -1 ? index = 0: null;
    if (index === (this.availableDevices.length - 1)) {
      index = 0
    } else {
       index++;
    }
    this.currentDevice = this.availableDevices[index];
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

  onScanError(error) {
    this.error = error;
  }

  public close() {
    this.scannerEnabled = false;
    this.dialogRef.close();
  }

  setManualBarcode(barcode: string) {
    console.log('Barcode: ', barcode);
  }
}
