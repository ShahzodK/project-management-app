import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {AppRoutePaths} from "../../core/models/routes.model";

@Injectable({
  providedIn: 'root',
})
export class AuthLoggedGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(): Promise<boolean> | boolean | UrlTree {
    return this.authService.isLoggedIn() ? this.router.parseUrl(AppRoutePaths.MAIN) : true;
  }

  canLoad(): Promise<boolean> | boolean | UrlTree {
    return this.authService.isLoggedIn() ? this.router.parseUrl(AppRoutePaths.MAIN) : true;
  }
}
