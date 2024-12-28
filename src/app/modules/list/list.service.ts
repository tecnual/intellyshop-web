import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from '@app/core/auth/account.service';
import { User } from '@app/core/auth/user.model';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { ListItem } from './list-item.model';
import { List, ListFile } from './list.model';
import { DefaultResponse, IDefaultResponse } from '@app/shared/models/default-response';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  public userListsSubject: BehaviorSubject<List[]> = new BehaviorSubject([]);
  public listSubject: BehaviorSubject<List> = new BehaviorSubject(null);
  public listsTotalsSubject: BehaviorSubject<any> = new BehaviorSubject([]);
  public userLists: Observable<any>;
  public list: Observable<any>;
  public totals: Observable<any>;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.userLists = this.userListsSubject.asObservable();
    this.list = this.listSubject.asObservable();
    this.totals = this.listsTotalsSubject.asObservable();
    //this.getUserLists(null);
  }
  public get userListsValue() {
    return this.userListsSubject.value;
  }

  public set listValue(list: List) {
    this.listSubject.next(list);
  }

  public get listValue() {
    return this.listSubject.value;
  }

  public addItemToList(listId: string, listItem: ListItem) {
    return this.http.patch(
      `${environment.apiUrl}/list/${listId}/item`,
      listItem
    );
  }

  public addItemToListCart(listId: string, listItem: ListItem) {
    return this.http.patch(
      `${environment.apiUrl}/list/${listId}/cart-item`,
      listItem
    );
  }

  public async getUserLists(listId: string) {
    return await this.http.get(`${environment.apiUrl}/list`).subscribe((res: any) => {
      this.userListsSubject.next(res);
      const listTotals = {};
      res.map((list) => {
        if(list._id === listId) {
          this.listValue = list;
        }
        listTotals[list._id] = {};
        listTotals[list._id].listTotal = 0;
        listTotals[list._id].listQuantityTotal = 0;
        listTotals[list._id].cartTotal = 0;
        listTotals[list._id].cartQuantityTotal = 0;
        list.listItems.forEach((li) => {
          listTotals[list._id].listTotal +=
            Number(li.price || 0) * Number(li.quantity || 0);
          listTotals[list._id].listQuantityTotal += Number(li.quantity || 0);
        });
        list.cartItems.forEach((li) => {
          listTotals[list._id].cartTotal +=
            Number(li.price || 0) * Number(li.quantity || 0);
          listTotals[list._id].cartQuantityTotal += Number(li.quantity || 0);
        });

        listTotals[list._id].total =
          listTotals[list._id].listTotal + listTotals[list._id].cartTotal;
      });
      this.listsTotalsSubject.next(listTotals);
    });
  }

  public removeItemFromList(listId: string, listItemId: string) {
    return this.http
      .delete(`${environment.apiUrl}/list/${listId}/item/${listItemId}`)
      .subscribe((res) => {
        this.getUserLists(listId);
      });
  }

  public removeItemFromListCart(listId: string, cartItemId: string) {
    return this.http
      .delete(`${environment.apiUrl}/list/${listId}/cart-item/${cartItemId}`)
      .subscribe((res) => {
        this.getUserLists(listId);
      });
  }

  public updateListItem(listId: string, listItem: ListItem, type: string) {
    const listItemId = listItem._id;
    delete listItem._id;
    let url: string;
    switch (type) {
      case 'list': {
        url = `${environment.apiUrl}/list/${listId}/list-item/${listItemId}`;
        break;
      }
      case 'cart': {
        url = `${environment.apiUrl}/list/${listId}/cart-item/${listItemId}`;
        break;
      }
      default: {
        url = `${environment.apiUrl}/list/${listId}/list-item/${listItemId}`;
        break;
      }
    }
    return this.http.put(url, listItem).subscribe((res) => {
      this.getUserLists(listId);
    });
  }

  public addSavedList(list: List): Observable<any> {
    const savedList = new List(list);

    return this.http.post(`${environment.apiUrl}/saved-list/`, savedList);
  }

  public removeListItems(listId: string) {
    return this.http.delete(`${environment.apiUrl}/list/${listId}/list`);
  }

  public removeCartItems(listId: string) {
    return this.http.delete(`${environment.apiUrl}/list/${listId}/cart`);
  }

  /**
   * Save list o generate a new one
   * @param list
   * @returns
   */
  public saveList(list: List): Observable<List> {
    return this.http.post(`${environment.apiUrl}/list`, list);
  }

  public deleteList(listId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/list/${listId}`);
  }

  /**
   * Share lists with users
   * @param listId
   * @param user
   * @returns Api response
   */
  public shareList(listId: string, user: User) {
    return this.http.put(
      `${environment.apiUrl}/list/${listId}/share-user`,
      user
    ); // TODO: puede ser post
  }

  /**
   * addImageToList
   * @param listId list identifier
   * @param image base64 image
   * @returns Api response
   */
  public addImageToList(listId: string, image: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/list/${listId}/image`, {
      image,
    });
  }

  /**
   * Delete all images
   * @param listId
   * @returns response
   */
  public deleteAllImages(listId: string) {
    return this.http.delete(`${environment.apiUrl}/list/${listId}/image`);
  }

  /**
   * Add File to list
   * @param listId
   * @param files
   * @returns
   */
  public addFileToList(listId: string, file: ListFile, firefly: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/list/${listId}/file`, { file, firefly });
  }
}
