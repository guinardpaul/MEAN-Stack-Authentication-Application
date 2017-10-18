import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  redirectUrl;

  constructor(
    private _authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._authService.loggedIn()) {
      return true;
    } else {
      this.redirectUrl = state.url;
      this.router.navigate([ '/login' ]);
      return false;
    }
  }

}
