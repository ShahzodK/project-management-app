import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router) {}

  canActivate(): Promise<boolean> | boolean | UrlTree {
    return this.checkToken();
  }

  canLoad(): Promise<boolean> | boolean | UrlTree {
    return this.checkToken();
  }

  public checkToken() {
    if (localStorage.getItem('authToken')) {
      return true;
    }
    return this.router.navigateByUrl('/login');
  }
}
