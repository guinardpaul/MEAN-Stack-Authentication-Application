import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../models/User';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;

  get username(): string { return this.loginForm.get('username').value as string; }
  get password(): string { return this.loginForm.get('password').value as string; }

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
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

          setTimeout(() => {
            this._router.navigate([ '/home' ]);
          }, 1000);
        } else {
          console.log(data.message);
        }
      }, err => {
        console.log(err);
      });
  }

  ngOnInit() {
  }

}
