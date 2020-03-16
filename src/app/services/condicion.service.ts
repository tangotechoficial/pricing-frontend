import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from './global';
import { Condicion } from '../models/condicion';
import { map } from 'rxjs/operators';

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
        return this.http.get(this.url + '/camada/', { headers: { 'Content-type': 'application/json' } }).toPromise();
    }

    getChaveContas(): Promise<any> {
        return this.http.get(this.url + '/chavecontas/', { headers: { 'Content-type': 'application/json' } }).toPromise();
    }

    getTiposValor(): Promise<any> {
        return this.http.get(this.url + '/tipovalor/', { headers: { 'Content-type': 'application/json' } }).toPromise();
    }

    getSequenciasAcesso(): Promise<any> {
        return this.http.get(this.url + '/sequencia/', { headers: { 'Content-type': 'application/json' } }).toPromise();
    }

    getSequenciasByCondicao(): Promise<any> {
        return this.http.get(this.url + '/condicaosequencia/', { headers: { 'Content-type': 'application/json' } }).toPromise();
    }

    postCondicao(co: Condicion): Promise<any> {
        console.log(co);
        return this.http.post(this.url + '/condicao/', {
            Cod_Condicao: co.sCodCondicion,
            Desc_Condicao: co.sDesCondicion,
            Escala_Qtde: co.bEscalaQtde ? 1 : 0,
            POS_NEG: co.bNeg ? 'N' : 'P',
            TIP_BASE_VENDAS: co.oCamada.TIPO_BASE_VENDAS,
            MANDATORIA: 0,
            ESTATISTICA: 0,
            Cod_Camada: co.oCamada.Cod_Camada,
            Cod_ChaveContas: co.oChaveContas.Cod_ChaveContas,
            Cod_TipoValor: co.oTipoValor.Cod_TipoValor
        }, { headers: { 'Content-type': 'application/json' } })
            .pipe(
                map((elem: any) =>
                    co.aSequencias.forEach(campo => {
                        this.postCondicaoSequencia(elem.Cod_Condicao, campo.Cod_Sequencia).subscribe();
                    }))
            ).toPromise();
    }

    editCondicao(co: Condicion): Promise<any> {
        console.log(co);
        return this.http.put(this.url + '/condicao/' + co.sCodCondicion + '/', {
            Cod_Condicao: co.sCodCondicion,
            Desc_Condicao: co.sDesCondicion,
            Escala_Qtde: co.bEscalaQtde ? 1 : 0,
            POS_NEG: co.bNeg ? 'N' : 'P',
            TIP_BASE_VENDAS: co.oCamada.TIPO_BASE_VENDAS,
            MANDATORIA: 0,
            ESTATISTICA: 0,
            Cod_Camada: co.oCamada.Cod_Camada,
            Cod_ChaveContas: co.oChaveContas.Cod_ChaveContas,
            Cod_TipoValor: co.oTipoValor.Cod_TipoValor
        }, { headers: { 'Content-type': 'application/json' } })
            .pipe(
                map((elem: any) => {
                    console.log(elem);
                    co.aSequencias.forEach(campo => {
                        this.postCondicaoSequencia(elem.Cod_Condicao, campo.Cod_Sequencia).subscribe();
                    });
                })
            ).toPromise();
    }

    async deleteRelation(sc: any) {
        await this.http
            .delete(this.url + '/condicaosequencia/' + sc.id + '/', { headers: { 'Content-type': 'application/json' } }).toPromise();
    }

    getLastCondicao(): Promise<any> {
        return this.http.get(this.url + '/condicao/last/', { headers: { 'Content-type': 'application/json' } }).toPromise();
    }

    deleteCondicaoSequencia(id: any) {
        const arr: any = [];
        const getSequenciasCondicao = this.http.get(
            this.url + '/condicaosequencia/', { headers: { 'Content-type': 'application/json' } }).toPromise();
        getSequenciasCondicao.then(
            (elems: any) => {
                elems.map(
                    (sc: any) => {
                        if (sc.Cod_Condicao === id) {
                            arr.push(sc);
                        }
                    });
                arr.map((sc: any) => {
                    this.deleteRelation(sc);
                });
            });
    }

    postCondicaoSequencia(condId, seqId) {
        return this.http.post(this.url + '/condicaosequencia/', {
            Cod_Condicao: condId,
            Cod_Sequencia: seqId
        }, { headers: { 'Content-type': 'application/json' } });
    }

    public getCondicaoByCode(): Promise<any> {
        return this.http.get(this.url + '/condicao/', { headers: { 'Content-type': 'application/json' } }).toPromise();
    }

    public getCondicaos(): Promise<any> {
        return this.http.get(this.url + '/condicao/', { headers: { 'Content-type': 'application/json' } }).toPromise();
    }

    public getCamadaEsquema(): Promise<any> {
        return this.http.get(this.url + '/camadaesquema/', { headers: { 'Content-type': 'application/json' } }).toPromise();
    }
}



