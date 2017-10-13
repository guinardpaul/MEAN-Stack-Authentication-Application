import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

// Services
import { AuthValidatorService } from '../../services/auth-validator.service';
import { AuthService } from '../../services/auth.service';

// Models
import { User } from '../../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  public get username() { return this.registerForm.get('username').value as string; }
  public get email() { return this.registerForm.get('email').value as string; }
  public get passwords() { return this.registerForm.controls[ 'passwords' ] as FormControl; }
  public get password() { return this.passwords.get('password').value as string; }
  public get confirmPassword() { return this.passwords.get('confirmPassword').value as string; }
  user = new User();

  constructor(
    private _fb: FormBuilder,
    private _authValidator: AuthValidatorService,
    private _authService: AuthService
  ) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this._fb.group({
      username: [ '', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this._authValidator.validUsernameChecker
      ]) ],
      email: [ '', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(40),
        this._authValidator.validEmailChecker
      ]) ],
      passwords: this._fb.group({
        password: [ '', Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40)
        ]) ],
        confirmPassword: [ '', Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40)
        ]) ],
      }, Validators.compose([
        // TODO: ajouter comparaison password validation
      ]))
    });
  }

  onRegister() {
    this.user = {
      username: this.username,
      email: this.email,
      password: this.password
    };
    console.log(this.user);
    this._authService.register(this.user)
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      });
  }

  ngOnInit() {
  }

}
