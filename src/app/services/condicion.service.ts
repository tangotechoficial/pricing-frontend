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

    getCamadas(){
        return this._http.get(this.url + '/camada/', {headers: {"Content-type": "application/json"}})
    }
    getChaveContas(){
        return this._http.get(this.url + '/chavecontas/', {headers: {"Content-type": "application/json"}})
    }
    getTiposValor(){
        return this._http.get(this.url + '/tipovalor/', {headers: {"Content-type": "application/json"}})
    }
    getSequenciasAcesso(){
        return this._http.get(this.url + '/sequencia/', {headers: {"Content-type": "application/json"}})
    }
}

