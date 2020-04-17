import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map, timeout} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentTokenSubject: BehaviorSubject<string>;
  private currentToken: Observable<string>;
  private currentUserSubject: BehaviorSubject<any>;
  private currentUser: Observable<string>;

  constructor(private httpClient: HttpClient){
    this.currentTokenSubject = new BehaviorSubject<string>(localStorage.getItem('token'));
    this.currentToken = this.currentTokenSubject.asObservable();
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('User')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, pass: string) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/login/`,
      {username: email, password: pass}
    ).pipe(map(response => {
      localStorage.setItem('token', JSON.stringify(response.token));
      this.currentTokenSubject.next(JSON.stringify(response.token));
      localStorage.setItem('User', response.user);
      this.currentUserSubject.next(response.user);
      return response.token;
    }))
  }

  public get currentTokenValue() {
    let token = this.currentTokenSubject.value;
    if (token) {
      token = token.replace(/^"(.*)"$/, '$1');
    }
    return token;
  }
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  logout(){
    localStorage.removeItem('token');
    this.currentTokenSubject.next(null);
    localStorage.removeItem('User');
    this.currentUserSubject.next(null);
  }

  isLogged() {
    return this.currentTokenSubject !== null;
  }
}
