import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/User';

@Injectable()
export class AuthService {
  private baseUrl: string;
  private apiUrl: string;
  public authToken;
  public user;

  constructor(
    private _http: HttpClient
  ) {
    this.baseUrl = 'http://localhost:3000/auth';
    this.apiUrl = '/api/users';
  }

  register(user: User): Observable<any> {
    return this._http.post(`${this.baseUrl}/register`, user);
  }

  login(user: User): Observable<any> {
    return this._http.post(`${this.baseUrl}/login`, user);
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile() {

  }

}
