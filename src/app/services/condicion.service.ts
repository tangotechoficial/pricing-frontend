import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Condicion } from '../models/condicion';

@Injectable()
export class CondicionService{

    public url: string;
    public _Condicion: Array<any>;

    constructor(
        private _http: HttpClient,
    ){
        this.url = Global.url;
    }

    getCamadas(): Promise<any>{
        return this._http.get(this.url + '/camada/', {headers: {"Content-type": "application/json"}}).toPromise()
    }
    getChaveContas(): Promise<any>{
        return this._http.get(this.url + '/chavecontas/', {headers: {"Content-type": "application/json"}}).toPromise()
    }
    getTiposValor(): Promise<any>{
        return this._http.get(this.url + '/tipovalor/', {headers: {"Content-type": "application/json"}}).toPromise()
    }
    getSequenciasAcesso(): Promise<any>{
        return this._http.get(this.url + '/sequencia/', {headers: {"Content-type": "application/json"}}).toPromise()
    }
}

