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
        return this._http.post(this.url + '/sacceso', { SEQCODE: seq.sSeqAcceso, SEQDESC: seq.sDesAcceso}, {headers: {"Content-type": "application/json"}});
    }

    postSaccesoComp(seq: Sacceso){
        console.log(seq);
        var aId = [];
        seq._parents.map(elem => aId.push(elem.getId()));
        console.log(aId);
        return this._http.post(this.url + '/sacceso_comp', { SEQCODE: seq.sSeqAcceso, SEQDESC: seq.sDesAcceso, SEQPARE: aId}, {headers: {"Content-type": "application/json"}});
    }

    getSaccesoList(): Observable<any>{
        return this._http.get(this.url + '/saccesos', {headers: {"Content-type": "application/json"}});
    }
}