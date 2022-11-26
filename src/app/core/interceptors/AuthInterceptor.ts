import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { FullRoutePaths } from '../constants/routes';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private INVALID_TOKEN_ERR_CODE = 403;

  constructor(private authService: AuthService) {
  }

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

    return next.handle(customReq)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === this.INVALID_TOKEN_ERR_CODE) {
            this.authService.logout(FullRoutePaths.WELCOME);
          }

          return throwError(() => err);
        }));
  }
}
