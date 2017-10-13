import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/User';

@Injectable()
export class AuthService {
  private baseUrl: string;
  private apiUrl: string;

  constructor(
    private _http: HttpClient
  ) {
    this.baseUrl = 'http://localhost:3000/auth';
    this.apiUrl = '/api/users';
  }

  register(user: User) {
    return this._http.post(`${this.baseUrl}/register`, user);
  }

}
