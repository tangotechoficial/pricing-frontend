import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Condicion } from '../models/condicion';
import { map } from 'rxjs/operators';

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

    postCondicao(co: Condicion): Promise<any>{
        return this._http.post(this.url + '/condicao/', {
            "Cod_Condicao": co.sCodCondicion,
            "Desc_Condicao": co.sDesCondicion,
            "Escala_Qtde": co.bEscalaQtde ? 1 : 0,
            "POS_NEG": co.bNeg ? "N" : "P",
            "TIP_BASE_VENDAS": co.oCamada.TIPO_BASE_VENDAS,
            "MANDATORIA": 0,
            "ESTATISTICA": 0,
            "id_Camada": co.oCamada.id,
            "id_ChaveContas": co.oChaveContas.id,
            "id_TipoValor": co.oTipoValor.id
        }, {headers: {"Content-type": "application/json"}})
         .pipe(
             map((elem: any) => 
                co.aSequencias.forEach(campo => {
                    this.postCondicaoSequencia(elem.id, campo.id).subscribe();
                }))
         ).toPromise()
    }

    postCondicaoSequencia(condId :any, seqId: any){
        return this._http.post(this.url + '/condicaosequencia/', {
            "id_Condicao": condId,
            "id_Sequencia": seqId
        }, {headers: {"Content-type": "application/json"}})
    }

    public getCondicaoByCode(): Promise<any>{
        return this._http.get(this.url + '/condicao/', {headers: {"Content-type": "application/json"}}).toPromise();
    }
}



