import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { List } from '../list/list.model';

/**
 * Finance service
 */
@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  /** All statistics data. Subject */
  public dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  /** Filtered statistics data. Subject */
  public filteredDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  /** All data. Obserbable */
  public allData: Observable<any>;
  /** Filtered statistics data. Observable */
  public filteredData: Observable<List[]>;

  /**
   * Constructor
   * @param http
   */
  constructor(
    private http: HttpClient,
  ) {
    this.allData = this.dataSubject.asObservable();
    this.filteredData = this.filteredDataSubject.asObservable();
  }

  /**
   * getStats
   * @param tags
   */
  public getStats() {
    return this.http.get<any>(`${environment.apiUrl}/saved-list?hideFields=images,listItems,cartItems`).subscribe({
      next: res => {
        this.dataSubject.next(res.data);
        this.filteredDataSubject.next(res.data); //TODO: provisional
      },
      error: error => {
        console.error('getStats error: ', error);
      }
    });
  }

  /**
   * getStats
   * @param tags
   */
  getInvoicesStats(filter) {
    return this.http.get<any>(`${environment.apiUrl}/invoice/?filter=${filter}`).subscribe({
      next: res => {
        this.dataSubject.next(res.data);
        this.filteredDataSubject.next(res.data); //TODO: provisional
      },
      error: error => {
        console.error('getInvoicesStats error: ', error);
      }
    });
  }
  /**
   * Get list tags
   * @returns
   */
  public getListTags(): string[]{
    const tags: string[] = [];
    this.dataSubject.value.map(item => {
      for (let tag of item.tags) {
        !tags.includes(tag) ? tags.push(tag): null;
      }
    });
    return tags;
  }

  /**
   * Filter data
   * @param tags
   */
  public filterData(tags: string[]) {
    const filteredData = (tags && tags.length > 0 ) ?
      this.dataSubject.value.filter(data => data.tags.some(t => tags.indexOf(t) >= 0)):
      this.dataSubject.value;
    this.filteredDataSubject.next(filteredData);
  }

  getFireflyAccounts() {
    return this.http.get<any>(`${environment.apiUrl}/finance/firefly/accounts`);
  }

  getFireflyCategories() {
    return this.http.get<any>(`${environment.apiUrl}/finance/firefly/categories`);
  }

  getFireflyBudgets() {
    return this.http.get<any>(`${environment.apiUrl}/finance/firefly/budgets`);
  }

  getFireflyTags() {
    return this.http.get<any>(`${environment.apiUrl}/finance/firefly/tags`);
  }
}
