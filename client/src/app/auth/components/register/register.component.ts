import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { AuthValidatorService } from '../../services/validators/auth-validator.service';
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
  user: User;
  processing: boolean;

  constructor(
    private _fb: FormBuilder,
    private _authValidator: AuthValidatorService,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.createForm();
    this.user = new User();
    this.processing = false;
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

    this._authService.register(this.user)
      .subscribe(data => {
        console.log('register...');
        console.log(data);

        setTimeout(() => {
          this._router.navigate([ '/login' ]);
        }, 1000);
      }, err => {
        console.log(err);
      });
  }

  ngOnInit() {
  }

}
