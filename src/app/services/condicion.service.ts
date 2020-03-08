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


  postCondiction(cond: Condicion){
      return this._http.post(this.url + '/condicion/' /*,  {Cod_Campo: seq.sSeqAcceso, Nome_Campo: seq.sDesAcceso} */, {headers: {"Content-type": "application/json"}});
      //define data to post
  }

  getCondDescription(): Observable <any>{
      return this._http.get(this.url + '/condicao/descriptions/', {headers: {"Content-type": "application/json"}});
  }
  getCondChave(){
      return this._http.get(this.url + '/condicao/chavecontas/', {headers: {"Content-type": "application/json"}});
  }

  getCondCamada(): Observable<any>{
      return this._http.get(this.url + '/condicao/camada/', {headers: {"Content-type": "application/json"}});
  }

  getCondVal(): Observable<any>{
    return this._http.get(this.url + '/condicao/tipovalor/', {headers: {"Content-type": "application/json"}});
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

