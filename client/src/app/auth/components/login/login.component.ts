import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private _fb: FormBuilder
  ) {
    this.createForm();
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

  ngOnInit() {
  }

}
