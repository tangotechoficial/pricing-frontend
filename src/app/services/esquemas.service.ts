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
    getEsquemaCalculo(COD: string): Promise<EsquemaCalculo> {
        return this.http
            .get(this.url + '/esquemacamadacondicion/', { headers: { 'Content-type': 'application/json' } })
            .toPromise()
            .then((result: any) => {
                let esquema: EsquemaCalculo = new EsquemaCalculo();
                result.map(elem => {
                    if (elem.Cod_Esquema_Calculo === COD) {
                        esquema = elem;
                    }
                });
                console.log(esquema);
                return esquema as EsquemaCalculo;
            });
    }
    /*
      Andrés Atencio 23/03/2020
      Get data and make relations
    */

  getEsquemaRelation(): Promise<any> {
    return this.http
      .get(this.url + "/condicaocamadaesquema/", {
        headers: { "Content-type": "application/json" }
      })
      .toPromise();
  }

  fetchCondicaoCamadaEsquema2(tipoBaseVendas: string) {
    let dataCondicaoCamadaEsquema = [];
    return new Promise((resolve, reject) => {
      const promiseEsquemaCada = fetch(
        this.url + "/esquemacamada/"
      ).then(resp => resp.json());
      const promiseTipoValor = this.condicionService.getTiposValor();

      Promise.all([promiseEsquemaCada, promiseTipoValor]).then(
        ([data, tipoValor]) => {
          console.log({ data });
          let camadas = data.filter(
            cam => cam.TIP_BASE_VENDAS == tipoBaseVendas
          );
          camadas = camadas[0].camadas;
          camadas.forEach(camada => {
            const data = {
              camada: camada,
              condicaos: camada.condicaos,
              condicaosAllow: camada.condicaos,
              tipoValor: tipoValor
            };

            dataCondicaoCamadaEsquema.push(data);
          });
          resolve(dataCondicaoCamadaEsquema);
        }
      ).catch(err => {
        reject(err);
      })
    });
  }

  fetchCondicaoCamadaEsquema(tipoBaseVendas: string) {
    let dataCondicaoCamadaEsquema = [];

    return new Promise((resolve, reject) => {
      // Fetch data
      Promise.all([
        this.condicionService.getTiposValor(),
        this.condicionService.getCamadas(),
        this.condicionService.getCondicaos(),
        this.getEsquemaRelation()
      ])
        .then(([tipoValor, camadas, condicaos, esquemaRelations]) => {
          // Filter camadas by TIPO_BASE_VENDAS
          camadas = camadas.filter(
            (camada: any) => camada.TIPO_BASE_VENDAS === tipoBaseVendas
          );

          // Relations
          camadas.forEach(elem => {
            const esquemaRelationsFiltered = esquemaRelations.filter(
              esqRel => esqRel.Cod_Camada === elem.Cod_Camada
            );
            const condicaosFiltered = esquemaRelationsFiltered.map(esqRel => {
              const condicaoWithIdRelation: any = condicaos.filter(
                cond => cond.Cod_Condicao === esqRel.Cod_Condicao
              )[0];
              condicaoWithIdRelation.idCondicaoCamadaEsquema = esqRel.id;
              return condicaoWithIdRelation;
            });

            const data = {
              camada: elem,
              condicaos: condicaosFiltered,
              condicaosAllow: condicaos.filter(
                (cond: any) => cond.Cod_Camada === elem.Cod_Camada
              ),
              tipoValor: tipoValor
            };

            dataCondicaoCamadaEsquema.push(data);
          });

          resolve(dataCondicaoCamadaEsquema);
        })
        .catch(err => {
          reject({ err, msg: "Error fetchCondicaoCamadaEsquema" });
        });
    });
  }
}
