import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

import { User } from '../../models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [ './profile.component.css' ]
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private _authService: AuthService) {
    this.user = new User();
  }

  ngOnInit() {
    this._authService.getProfile()
      .subscribe(data => {
        this.user = data.obj;
      }, err => console.log(err)
      );
  }

}
