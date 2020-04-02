import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { Global } from './global';
import { environment} from '@env/environment';

@Injectable({providedIn: 'root'})
export class LoginService{
    public url: string;
    constructor(
        private _http: HttpClient
    ){
        this.url = `${environment.apiUrl}/login`;
    }

    login(user: User): Observable <any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.post(this.url, params, {headers: headers});
    }
}
