import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from './global';
import { CondicionService } from './condicion.service';

@Injectable()
export class EsquemasService {

    public url: string;
    public condicion: Array<any>;
    constructor(
        private http: HttpClient,
        private condicionService: CondicionService
    ) {
        this.url = Global.url;
    }

    postEsquema({Cod_Esquema_Calculo, Cod_Condicao, Cod_Camada}: any): Promise<any> {
        // tslint:disable-next-line: max-line-length
        return this.http.post(this.url + '/condicaocamadaesquema/', {Cod_Esquema_Calculo, Cod_Condicao, Cod_Camada}, { headers: { 'Content-type': 'application/json' } }).toPromise();
    }

    removeEsquema({id}: any): Promise<any> {
        // tslint:disable-next-line: max-line-length
        return this.http.delete(this.url + '/condicaocamadaesquema/' + id, { headers: { 'Content-type': 'application/json' } }).toPromise();
    }

    getEsquemaRelation(): Promise<any> {
        return this.http.get(this.url + '/condicaocamadaesquema/', { headers: { 'Content-type': 'application/json' } }).toPromise();
    }

    async getEsquema() {
        return await Promise.all([
            this.getEsquemaRelation(),
            this.condicionService.getCamadas(),
            this.condicionService.getCondicaos()
        ]);
    }

    getFilial(): Promise<any> {
        return this.http.get(this.url + '/filial/', { headers: { 'Content-type': 'application/json' } }).toPromise();
    }

    getFaturamento(): Promise<any> {
        return this.http.get(this.url + '/faturamento/', { headers: { 'Content-type': 'application/json' } }).toPromise();
    }

    getEstado(): Promise<any> {
        return this.http.get(this.url + '/estado/', { headers: { 'Content-type': 'application/json' } }).toPromise();
    }

    getRegion(): Promise<any> {
        return this.http.get(this.url + '/region/', { headers: { 'Content-type': 'application/json' } }).toPromise();
    }

    // editCondicao(co: Condicion): Promise<any> {
    //     return this.http
    //       .put(
    //         this.url + "/condicao/" + co.sId + "/",
    //         {
    //           Cod_Condicao: co.sCodCondicion,
    //           Desc_Condicao: co.sDesCondicion,
    //           Escala_Qtde: co.bEscalaQtde ? 1 : 0,
    //           POS_NEG: co.bNeg ? "N" : "P",
    //           TIP_BASE_VENDAS: co.oCamada.TIPO_BASE_VENDAS,
    //           MANDATORIA: 0,
    //           ESTATISTICA: 0,
    //           id_Camada: co.oCamada.id,
    //           id_ChaveContas: co.oChaveContas.id,
    //           id_TipoValor: co.oTipoValor.id
    //         },
    //         { headers: { "Content-type": "application/json" } }
    //       )
    //       .pipe(
    //         map((elem: any) =>
    //           co.aSequencias.forEach(campo => {
    //             this.postCondicaoSequencia(elem.id, campo.id).subscribe();
    //           })
    //         )
    //       )
    //       .toPromise();
    //   }

    updateCondicao(cond): Promise<any> {
        console.log({cond})
        return this.http.put(this.url + "/condicao/" + cond.Cod_Condicao + "/",cond,{ headers: { "Content-type": "application/json" } }).toPromise()
    }
}



