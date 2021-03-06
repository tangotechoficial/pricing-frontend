import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CondicionService } from './condicion.service';
import { EsquemaCalculo } from '@app/models/esquemacalculo';
import { Mercadoria } from '@app/models/mercadoria';
import { FilialExpedicao } from '@app/models/filialexpedicao';
import { FilialFaturamento } from '@app/models/filialfaturamento';
import { Estado } from '@app/models/estado';
import { Regiao } from '@app/models/regiao';
import { ChavePrecificao } from '@app/models/chaveprecificao';
import { environment } from '@env/environment';

@Injectable()
export class EsquemasService {
  public url: string;
  public condicion: Array<any>;
  constructor(
    private http: HttpClient,
    private condicionService: CondicionService
  ) {
    this.url = `${environment.apiUrl}/dinamica`;
  }

  getSequenciaValues(endpoint: string): Promise<any> {
    return this.http
      .get(this.url + '/' + endpoint + '/', { headers: { 'Content-type': 'application/json' } })
      .toPromise()
      .then((result: any) => {
        return result.results;
      });
  }

  getChavePrecificao(id: string): Promise<ChavePrecificao> {
    return this.http
      .get(this.url + '/chaveprecificao/' + id + '/', { headers: { 'Content-type': 'application/json' } })
      .toPromise()
      .then((result: any) => {
        return result.results as ChavePrecificao;
      });
  }

  postPreco(tipe: any, chav: any, codesq: any, val: any): Promise<any> {

    const f = new Date();
    const date = f.getFullYear() + '-' + f.getMonth() + '-' + f.getDate();
    let idPreco: any;
    return this.getPreco()
      .then(result => {
        console.log(result);
        result = result.filter(obj => {
          return obj.chave === chav && obj.tipo_base_vendas === tipe;
        });
        if (result.length !== 0) {
          idPreco = result[0].id;
          this.http.delete(this.url + '/preco/' + idPreco + '/', { headers: { 'Content-type': 'application/json' } })
            .toPromise()
            .then(rs => {
              return this.http
                .post(this.url + '/preco/', {
                  id: Math.round(Math.random() * 100),
                  tipo_base_vendas: tipe,
                  datainicio: date,
                  valor: val,
                  cod_esquema_calculo: codesq,
                  chave: chav
                }, { headers: { 'Content-type': 'application/json' } })
                .toPromise()
                .then((result2: any) => {
                  return result2.results as any;
                })
                .catch(error => {
                  throw new Error(error);
                });
            })
            .catch(err => {
              throw new Error(err);
            });
        } else {
          return this.http
            .post(this.url + '/preco/', {
              id: Math.round(Math.random() * 100),
              tipo_base_vendas: tipe,
              datainicio: date,
              valor: val,
              cod_esquema_calculo: codesq,
              chave: chav
            }, { headers: { 'Content-type': 'application/json' } })
            .toPromise()
            .then((result: any) => {
              return result.results;
            });
        }

      });
  }
  getPreco(): Promise<any> {
    return this.http
      .get(this.url + '/preco/', { headers: { 'Content-type': 'application/json' } })
      .toPromise()
      .then((result: any) => {
        return result.results;
      });
  }

  getMercadoria(): Promise<Mercadoria[]> {
    return this.http
      .get(this.url + '/productos/', { headers: { 'Content-type': 'application/json' } })
      .toPromise()
      .then((result: any) => {
        return result.results as Mercadoria[];
      });
  }

  postEsquema(condCamEsq: any): Promise<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.post(this.url + '/condicaocamadaesquema/', condCamEsq, { headers: { 'Content-type': 'application/json' } }).toPromise();
  }

  removeEsquema({ id }: any): Promise<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.delete(this.url + '/condicaocamadaesquema/' + id, { headers: { 'Content-type': 'application/json' } }).toPromise();
  }

  async getEsquema() {
    return await Promise.all([
      this.condicionService.getCamadas(),
      this.condicionService.getCondicaos()
    ]);
  }

  getFilialExpedicao(): Promise<FilialExpedicao[]> {
    return this.http
      .get(this.url + '/filialexpedicao/', { headers: { 'Content-type': 'application/json' } })
      .toPromise()
      .then((result: any) => {
        return result.results as FilialExpedicao[];
      });
  }

  getFilialFaturamento(): Promise<FilialFaturamento[]> {
    return this.http
      .get(this.url + '/filialfaturamento/', { headers: { 'Content-type': 'application/json' } })
      .toPromise()
      .then((result: any) => {
        return result.results as FilialFaturamento[];
      });
  }

  getEstado(): Promise<Estado[]> {
    return this.http
      .get(this.url + '/estado/', { headers: { 'Content-type': 'application/json' } })
      .toPromise()
      .then((result: any) => {
        return result.results as Estado[];
      });
  }
  getRegiao(): Promise<Regiao[]> {
    return this.http
      .get(this.url + '/regiao/', { headers: { 'Content-type': 'application/json' } })
      .toPromise()
      .then((result: any) => {
        return result.results as Regiao[];
      });
  }

  updateCondicao(cond): Promise<any> {
    console.log({ cond });
    return this.http
      .put(this.url + '/condicao/' + cond.cod_condicao + '/', cond, { headers: { 'Content-type': 'application/json' } }).toPromise();
  }
  getEsquemaCalculo(COD: string): Promise<EsquemaCalculo> {
    return this.http
      .get(this.url + '/esquemarelations/', { headers: { 'Content-type': 'application/json' } })
      .toPromise()
      .then((result: any) => {
        console.log(result);
        let esquema: EsquemaCalculo = new EsquemaCalculo();
        result.results.map(elem => {
          if (elem.tipo_base_vendas === COD) {
            esquema = elem;
          }
        });
        return esquema as EsquemaCalculo;
      });
  }


  getEsquemaRelation(): Promise<[]> {
    return this.http
      .get(this.url + '/condicaocamadaesquema/', {
        headers: { 'Content-type': 'application/json' }
      })
      .toPromise()
      .then((data: any) => {
        return data.results
      })
      .catch(err => {
        return new Error('')
      })
  }

  fetchCondicaoCamadaEsquema(tipoBaseVendas: string) {

    let dataCondicaoCamadaEsquema = []

    return new Promise((resolve, reject) => {

      // Fetch data
      Promise.all([
        this.condicionService.getTiposValor(),
        this.condicionService.getCamadas(),
        this.condicionService.getCondicaos(),
        this.getEsquemaRelation()
      ]).then(([tipoValor, camadas, condicaos, esquemaRelations]) => {
        console.log({ tipoValor, camadas, condicaos, esquemaRelations })

        // Filter camadas by TIPO_BASE_VENDAS
        camadas = camadas.filter((camada: any) => camada.tipo_base_vendas === tipoBaseVendas);
        // Relations
        camadas.forEach(elem => {
          elem.value = '';
          const esquemaRelationsFiltered = esquemaRelations.filter((esqRel: any) => esqRel.cod_camada === elem.cod_camada)
          const condicaosFiltered = esquemaRelationsFiltered.map((esqRel: any) => {
            const condicaoWithIdRelation = condicaos.filter((cond: any) => cond.cod_condicao == esqRel.cod_condicao)[0]
            condicaoWithIdRelation.idCondicaoCamadaEsquema = esqRel.id
            return condicaoWithIdRelation
          })

          const data = {
            camada: elem,
            condicaos: condicaosFiltered,
            condicaosAllow: condicaos.filter((cond: any) => cond.cod_camada === elem.cod_camada),
            tipoValor: tipoValor
          }

          dataCondicaoCamadaEsquema.push(data)
        })

        resolve(dataCondicaoCamadaEsquema)

      })
        .catch(err => {
          reject({ err, msg: 'Error fetchCondicaoCamadaEsquema' })
        })


    })
  }

  putEsquemaCamadaCondicion(esqCamCond) {
    return new Promise((resolve, reject) => {
      fetch(this.url + '/condicaocamadaesquema/' + esqCamCond.id, {
        method: 'PUT',
        body: esqCamCond,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    });
  }
}
