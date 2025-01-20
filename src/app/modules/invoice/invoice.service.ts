import { inject, Injectable } from '@angular/core';
import { InvoiceLine } from './invoice.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private readonly http = inject(HttpClient);
  public setInvoiceLine(invoiceId: string, invoiceLine: InvoiceLine): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/invoice/${invoiceId}/line/${invoiceLine._id}`,{invoiceLine});
  }
}
