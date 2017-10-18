import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../../shared/models/User';

import { FlashMsgService } from '../../../shared/services/flash-msg.service';
import { AuthService } from '../../services/auth.service';

import { AuthGuard } from '../../../routing/guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  previousUrl;

  get username(): string { return this.loginForm.get('username').value as string; }
  get password(): string { return this.loginForm.get('password').value as string; }

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _flashMsg: FlashMsgService,
    private _authGuard: AuthGuard,
    private _router: Router
  ) {
    this.createForm();
    this.user = new User();
  }

  createForm() {
    this.loginForm = this._fb.group({
      username: [ '', Validators.compose([
        Validators.required
      ]) ],
      password: [ '', Validators.compose([
        Validators.required
      ]) ]
    });
  }

  onLogin() {
    this.user = {
      username: this.username,
      password: this.password
    };

    this._authService.login(this.user)
      .subscribe(data => {
        console.log('login...');
        console.log(data);
        if (data.success) {
          console.log(data.message);
          this._authService.storeUserData(data.token, data.obj);
          this._flashMsg.displayMsg(data.obj.username + ' logged in', 'alert-success', 2000);
          setTimeout(() => {

            if (this.previousUrl) {
              this._router.navigate([ this.previousUrl ]);
            } else {
              this._router.navigate([ '/' ]);
            }
          }, 1000);
        } else {
          console.log(data.message);
          this._flashMsg.displayMsg(data.message, 'alert-danger', 2000);
        }
      }, err => {
        console.log(err);
      });
  }

  ngOnInit() {
    if (this._authGuard.redirectUrl) {
      this._flashMsg.displayMsg('You must be logged in to biew that page', 'alert-danger', 2000);
      this.previousUrl = this._authGuard.redirectUrl;
      this._authGuard.redirectUrl = undefined;
    }
  }

}
