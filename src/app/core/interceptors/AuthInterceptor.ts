import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthService } from './../../auth/services/auth.service';
import { FullRoutePaths } from './../constants/routes';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

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
      if (err instanceof HttpErrorResponse || !request.url.includes(FullRoutePaths.LOGIN) || !request.url.includes(FullRoutePaths.SIGN_UP)) {
        if (err.status !== 401) {
          throw Error(err);
        }
        this.authService.logout(FullRoutePaths.WELCOME);
      }
      throw Error(err);
    }));


  }
}
