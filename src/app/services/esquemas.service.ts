import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from './global';
import { CondicionService } from './condicion.service';
import { EsquemaCalculo } from '@app/models/esquemacalculo';

@Injectable()
export class EsquemasService {

    public url: string;
    public condicion: Array<any>;
    constructor(
        private http: HttpClient,
        private condicionService: CondicionService
    ) {
        //this.url = Global.url;
        this.url = 'https://pricing.tangotechapp.com/api/v1';
    }

    getMercadoria(): Promise<any> {
        return this.http.get(this.url + '/mercadoria/', { headers: { 'Content-type': 'application/json' } }).toPromise();
    }

    postEsquema({Cod_Esquema_Calculo, Cod_Condicao, Cod_Camada}: any): Promise<any> {
        // tslint:disable-next-line: max-line-length
        return this.http.post(this.url + '/condicaocamadaesquema/', {Cod_Esquema_Calculo, Cod_Condicao, Cod_Camada}, { headers: { 'Content-type': 'application/json' } }).toPromise();
    }

    removeEsquema({id}: any): Promise<any> {
        // tslint:disable-next-line: max-line-length
        return this.http.delete(this.url + '/condicaocamadaesquema/' + id, { headers: { 'Content-type': 'application/json' } }).toPromise();
    }

    async getEsquema() {
        return await Promise.all([
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

    updateCondicao(cond): Promise<any> {
        console.log({cond});
        return this.http
            .put(this.url + '/condicao/' + cond.Cod_Condicao + '/', cond, { headers: { 'Content-type': 'application/json' } }).toPromise();
    }
    getEsquemaCamadaCondicion(): Promise<EsquemaCalculo[]> {
        return this.http
            .get(this.url + '/esquemacamadacondicion/', { headers: { 'Content-type': 'application/json' } })
            .toPromise()
            .then(result => {
                return result as EsquemaCalculo[];
            });

    }
    /*
      Andrés Atencio 23/03/2020
      Get data and make relations
    */
    fetchCondicaoCamadaEsquema(tipoBaseVendas: string) {
        const dataCondicaoCamadaEsquema = [];
        return new Promise((resolve, reject) => {

            // Fetch data
            Promise.all([
                this.condicionService.getTiposValor(),
                this.condicionService.getCamadasAndCondicaos(),
                this.condicionService.getCondicaos()
              ]).then(([tipoValor, camadas, condicaos]) => {
                dataCondicaoCamadaEsquema.push(tipoValor);
                dataCondicaoCamadaEsquema.push(camadas);
                dataCondicaoCamadaEsquema.push(condicaos);
                resolve(dataCondicaoCamadaEsquema);

              })
              .catch(err => {
                  reject({err, msg: 'Error fetchCondicaoCamadaEsquema'});
              });
        });
    }
}



