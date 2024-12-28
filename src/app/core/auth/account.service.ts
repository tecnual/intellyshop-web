
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from './user.model';
import { LoginResponse } from './login/login-response.dto';
import { UserResponse } from './infrastructure/user.rest.dto';
import { DefaultResponse } from '@app/shared/models/default-response';
import { UserMapper } from './infrastructure/user.rest.mapper';

@Injectable({ providedIn: 'root' })
export class

  AccountService {
  private sessionSubject: BehaviorSubject<LoginResponse>;
  public session: Observable<LoginResponse>;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    const session: any = JSON.parse(localStorage.getItem('session') as string); // TODO: tipear el objeto session
    this.sessionSubject = new BehaviorSubject<LoginResponse>(session ? session : null);
    this.session = this.sessionSubject.asObservable();
  }

  public get sessionValue(): LoginResponse {
    return this.sessionSubject.value;
  }

  login(username, password) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, { username, password })
      .pipe(map(res => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('session', JSON.stringify(res));
        this.sessionSubject.next(res);
        return res;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('session');
    this.sessionSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/user`, user);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  update(id: any, params: any) {
    return this.http.put<DefaultResponse<UserResponse>>(`${environment.apiUrl}/user`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (id == this.sessionValue.user._id) {
          // update local storage
          this.sessionValue.user = new UserMapper().responseToDomain(x.data);
          const session = { ...this.sessionValue };
          localStorage.setItem('session', JSON.stringify(session));

          // publish updated user to subscribers
          this.sessionSubject.next(session);
        }
        return x;
      }));
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`)
      .pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        if (id == this.sessionValue.user.id) {
          this.logout();
        }
        return x;
      }));
  }

  /**
   * Get users by filter
   * @param filter
   * @returns
   */
  public geFilteredUsers(filter: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/user?filter=` + filter);
  }

  /**
   * Confirm email by token
   * @param token
   * @returns
   */
  public confirmEmail(token: string) {
    return this.http.get<User[]>(`${environment.apiUrl}/auth/confirm?token=` + token);
  }
}
