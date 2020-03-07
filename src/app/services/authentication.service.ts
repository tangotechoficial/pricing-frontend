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

  constructor(private httpClient: HttpClient){
    this.currentTokenSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('token')));
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  login(email: string, password: string) {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/login/`,
      {'username': email, 'password': password}
    ).pipe(map(response => {
      debugger;
      localStorage.setItem('token', JSON.stringify(response['token']));
      this.currentTokenSubject.next(response['token']);
      return response['token'];
    }))
  }

  public get currentTokenValue() {
    return this.currentTokenSubject.value
  }

  logout(){
    localStorage.removeItem('token');
    this.currentTokenSubject.next(null)
  }

  isLogged() {
    return this.currentTokenSubject !== null
  }
}
