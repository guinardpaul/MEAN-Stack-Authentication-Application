import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._authService.loggedIn()) {
      this.router.navigate([ '/' ]);
      return false;
    } else {
      return true;
    }
  }

}
