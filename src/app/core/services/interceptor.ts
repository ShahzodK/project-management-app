import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';


@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('assets')) {
      return next.handle(request);
    }

    const url = `${environment.baseUrl}${request.url}`;
    const headers = request.headers
      .append('Authorization', `Bearer ${localStorage.getItem('authToken')}`)
      .append('Accept', 'application/json');

    const customReq = request.clone({
      url,
      headers,
    });

    return next.handle(customReq);
  }
}
