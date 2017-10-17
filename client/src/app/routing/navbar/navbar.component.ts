import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css' ]
})
export class NavbarComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  onLogout() {
    this._authService.logout();
    this._router.navigate([ '/' ]);
  }

  ngOnInit() {
  }

}
