import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Global } from './global';
import { Condicion } from '../models/condicion';
import { map } from 'rxjs/operators';
import { ModelCondicao } from 'app/models/condicion.model';

@Injectable()
export class CondicionService {

    public url: string;
    public condicion: Array<any>;
    constructor(
        private http: HttpClient,
    ) {
        this.url = Global.url;
    }

    getCamadas(): Promise<any> {
        return this.http.get(this.url + '/camada/', {headers: {'Content-type': 'application/json'}}).toPromise();
    }
    getChaveContas(): Promise<any> {
        return this.http.get(this.url + '/chavecontas/', {headers: {'Content-type': 'application/json'}}).toPromise();
    }
    getTiposValor(): Promise<any> {
        return this.http.get(this.url + '/tipovalor/', {headers: {'Content-type': 'application/json'}}).toPromise();
    }
    getSequenciasAcesso(): Promise<any> {
        return this.http.get(this.url + '/sequencia/', {headers: {'Content-type': 'application/json'}}).toPromise();
    }
    getSequenciasByCondicao(): Promise<any> {
        return this.http.get(this.url + '/condicaosequencia/', {headers: {'Content-type': 'application/json'}}).toPromise();
    }
    postCondicao(co: Condicion): Promise<any> {
        return this.http.post(this.url + '/condicao/', {
            Cod_Condicao: co.sCodCondicion,
            Desc_Condicao: co.sDesCondicion,
            Escala_Qtde: co.bEscalaQtde ? 1 : 0,
            POS_NEG: co.bNeg ? 'N' : 'P',
            TIP_BASE_VENDAS: co.oCamada.TIPO_BASE_VENDAS,
            MANDATORIA: 0,
            ESTATISTICA: 0,
            id_Camada: co.oCamada.id,
            id_ChaveContas: co.oChaveContas.id,
            id_TipoValor: co.oTipoValor.id
        }, {headers: {'Content-type': 'application/json'}})
         .pipe(
             map((elem: any) =>
                co.aSequencias.forEach(campo => {
                    this.postCondicaoSequencia(elem.id, campo.id).subscribe();
                }))
         ).toPromise();
    }

    postCondicaoSequencia(condId, seqId) {
        return this.http.post(this.url + '/condicaosequencia/', {
            id_Condicao: condId,
            id_Sequencia: seqId
        }, {headers: {'Content-type': 'application/json'}});
    }

    public getCondicaoByCode(): Promise<any> {
        return this.http.get(this.url + '/condicao/', {headers: {'Content-type': 'application/json'}}).toPromise();
    }

    public getCondicaoCamada(): Promise<any> {
        return this.http.get(this.url + '/condicaocamada/', {headers: {'Content-type': 'application/json'}}).toPromise();
    }
}



