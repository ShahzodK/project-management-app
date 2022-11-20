import { resetUser } from 'src/app/redux/actions';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private store: Store) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('authToken');
    if (request.url.includes('assets')) {
      return next.handle(request);
    }

    const url = `${environment.baseUrl}${request.url}`;
    const headers = request.headers
      .append('Authorization', `Bearer ${authToken}`)
      .append('Accept', 'application/json');

    const customReq = request.clone({
      url,
      headers,
    });

    return next.handle(customReq).pipe(catchError((err) => {
      if (err instanceof HttpErrorResponse || !request.url.includes('auth/login') || !request.url.includes('auth/signup')) {
        if (err.status !== 401) {
          throw Error(err);
        }
        this.store.dispatch(resetUser());
        localStorage.removeItem('authToken');
        this.router.navigateByUrl('/welcome');
      }
      throw Error(err);
    }));


  }
}
