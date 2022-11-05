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
    const temporaryToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NGNmOTZkMi01OGZjLTRlMGMtOTZkOS05YWM0MjhkNGQ0OTUiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTIwMDMyMTF9.EUlvrrs0Hl7wq1o-vkW5eh710CeNmhTfivk8aYkO43I';
    const headers = request.headers
      .append('Authorization', `Bearer ${localStorage.getItem('authToken') || temporaryToken}`)
      .append('Accept', 'application/json');

    const customReq = request.clone({
      url,
      headers,
    });

    return next.handle(customReq);
  }
}
