import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Condicion } from '../models/condicion';

@Injectable()
export class CondicionService{

    public url: string;
    public _aCondicion: Array<any>;

    constructor(
        private _http: HttpClient,
    ){
        this.url = Global.url;
    }

    postSacceso(seq: Condicion): Observable <any>{
        let _currUser = JSON.parse(localStorage.getItem("User"));
        let _params = {
            params: seq,
            currUser: _currUser
        }
        console.log(_params);
        return this._http.post(this.url + '/condicion', _params, {headers: {"Content-type": "application/json"}});
    }
}