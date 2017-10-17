import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';

import { User } from '../models/User';

@Injectable()
export class AuthService {
  private baseUrl: string;
  private apiUrl: string;
  public authToken;
  public user;
  private headers: HttpHeaders;

  constructor(
    private _http: HttpClient
  ) {
    this.baseUrl = 'http://localhost:3000/auth';
    this.apiUrl = '/api/users';
  }

  createHeaders() {
    this.getToken();
    this.headers = new HttpHeaders({
      'content-type': 'application/json',
      'authorization': this.authToken
    });
  }

  getToken() {
    this.authToken = localStorage.getItem('token');
  }

  register(user: User): Observable<any> {
    return this._http.post(`${this.baseUrl}/register`, user);
  }

  login(user: User): Observable<any> {
    return this._http.post(`${this.baseUrl}/login`, user);
  }

  logout() {
    this.authToken = null; // Set token to null
    this.user = null; // Set user to null
    localStorage.clear();
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile(): Observable<any> {
    this.createHeaders();
    return this._http.get(`${this.baseUrl}/profile`, { headers: this.headers });
  }

  loggedIn() {
    return tokenNotExpired();
  }

}
