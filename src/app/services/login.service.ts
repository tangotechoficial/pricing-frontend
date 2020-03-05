import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Global } from './global';

@Injectable()
export class LoginService{
    public url: string;
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    login(user: User): Observable <any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.post(this.url + '/login', params, {headers: headers});
    }
}