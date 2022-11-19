import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FullRoutePaths } from '../../core/constants/routes';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Promise<boolean> | boolean | UrlTree {
    return this.authService.isLoggedIn() ? true : this.router.parseUrl(FullRoutePaths.LOGIN);
  }

  canLoad(): Promise<boolean> | boolean | UrlTree {
    return this.authService.isLoggedIn() ? true : this.router.parseUrl(FullRoutePaths.LOGIN);
  }
}
