import { Injectable } from '@angular/core';

@Injectable()
export class AuthValidatorService {

  constructor() { }

  validEmailChecker(controls) {
    const EMAIL_REGEXP =
      new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (EMAIL_REGEXP.test(controls.value)) {
      return null;
    } else {
      return {
        validEmailChecker: true
      };
    }
  }

  validUsernameChecker(controls) {
    const USERNAME_REGEXP = new RegExp(/[a-zA-z-_éè]+$/);
    if (USERNAME_REGEXP.test(controls.value)) {
      return null;
    } else {
      return {
        validUsernameChecker: true
      };
    }
  }

  /* passwordValidation(controls) {
    const password = this.register.password;
    const confirmPassword = this.register.confirmPassword;
    console.log(password);
    if (password === confirmPassword) {
      return null;
    } else {
      return {
        passwordValidation: true
      };
    }
  } */

}
