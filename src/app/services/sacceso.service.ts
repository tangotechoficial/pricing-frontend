import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Sacceso } from '../models/sacceso';
import { sanitizeIdentifier } from '@angular/compiler';
import { asLiteral } from '@angular/compiler/src/render3/view/util';

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
        return this._http.post(this.url + '/seqcampo/', { Cod_Campo: seq.sSeqAcceso, Nome_Campo: seq.sDesAcceso}, {headers: {"Content-type": "application/json"}});
    }

    postSaccesoComp(seq: Sacceso){
        console.log(seq);
        var aId = [];
        seq._parents.map(elem => aId.push(elem.getId()));
        console.log(aId);
        return this._http.post(this.url + '/sequencia/', { Cod_Sequencia: seq.sSeqAcceso, Nome_Sequencia: seq.sDesAcceso}, {headers: {"Content-type": "application/json"}});
    }

    getSaccesoList(): Observable <any>{
        return this._http.get(this.url + '/seqcampo/', {headers: {"Content-type": "application/json"}});
    }

    getLastSeqCampo(){
        return this._http.get(this.url + '/seqcampo/last/', {headers: {"Content-type": "application/json"}});
    }

    getLastSequencia(): Observable<any>{
        return this._http.get(this.url + '/sequencia/last/', {headers: {"Content-type": "application/json"}});
    }
}