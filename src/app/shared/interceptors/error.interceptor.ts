import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from '@core/auth/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    public readonly translate: TranslateService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (
          [401].includes(err.status) &&
          this.accountService.sessionValue
        ) {
          this.accountService.logout();
        }
        let error = null;
        if (err.status === 401) {
          this.translate.get('account.unauthorized').subscribe((res: string) => {
            //=> 'hello world'
            error = [
              {
                code: 'ST00401',
                message: res,
              },
            ];
          });
        } else {
          error = err.error?.errors || [
            { code: 'ST00500', message: err.statusText },
          ];
        }

        //error.push({code: 'ST00501', message: err.statusText});
        let content = '';
        error.forEach((e) => {
          content += e.message + '. ';
        });
        this.snackBar.open(content, 'Close', {
          duration: 3000,
        });

        return throwError(() => error);
      })
    );
  }
}
