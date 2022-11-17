import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad, Route,
  Router,
  RouterStateSnapshot, UrlSegment,
  UrlTree
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router) {}

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean | UrlTree {
    console.log(state.url)
    console.log(this.isLogged())
    if (state.url === '/login' && this.isLogged()) {
      return this.router.parseUrl('/main')
    }

    return this.checkToken();
  }

  canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> | boolean | UrlTree {

    // console.log(route)
    // console.log(segments)
    return this.checkToken();
  }

  private checkToken() {
    if (this.isLogged()) {
      return true;
    }

    return this.router.parseUrl('/login');
  }

  private isLogged(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
