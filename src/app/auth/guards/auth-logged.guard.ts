import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthLoggedGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(): Promise<boolean> | boolean | UrlTree {
    return this.authService.isLoggedIn() ? this.router.parseUrl('/main') : true;
  }

}
