import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Sacceso } from '../models/sacceso';

@Injectable()
export class SaccesoService{

    public url: string;
    public _aSequenciaAcceso: Array<any>;

    constructor(
        private _http: HttpClient,
    ){
        this.url = Global.url;
    }

    postSacceso(seq: Sacceso){
        console.log(seq);
        return this._http.post(this.url + '/sacceso', { SEQCODE: seq.sSeqAcceso, SEQDESC: seq.sDesAcceso}, {headers: {"Content-type": "application/json"}});
    }

    getSaccesoList(): Observable<any>{
        return this._http.get(this.url + '/saccesos', {headers: {"Content-type": "application/json"}});
    }
}