import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from './global';
import { Condicion } from '../models/condicion';
import { map } from 'rxjs/operators';


@Injectable()
export class CondicionService {
  public url: string;
  public condicion: Array<any>;
  constructor(private http: HttpClient) {
    this.url = Global.url;
  }

  getCamadas(): Promise<any> {
    return this.http
      .get(this.url + '/camada/', {
        headers: { 'Content-type': 'application/json' }
      })
      .toPromise();
  }

  getChaveContas(): Promise<any> {
    return this.http
      .get(this.url + '/chavecontas/', {
        headers: { 'Content-type': 'application/json' }
      })
      .toPromise();
  }

  getTiposValor(): Promise<any> {
    return this.http
      .get(this.url + '/tipovalor/', {
        headers: { 'Content-type': 'application/json' }
      })
      .toPromise();
  }

  getSequenciasAcesso(): Promise<any> {
    return this.http
      .get(this.url + '/sequencia/', {
        headers: { 'Content-type': 'application/json' }
      })
      .toPromise();
  }

  getSequenciasByCondicao(): Promise<any> {
    return this.http
      .get(this.url + '/condicaosequencia/', {
        headers: { 'Content-type': 'application/json' }
      })
      .toPromise();
  }

  postCondicao(co: Condicion): Promise<any> {
    console.log(co);
    return this.http
      .post(
        this.url + '/condicao/',
        {
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
        },
        { headers: { 'Content-type': 'application/json' } }
      )
      .pipe(
        map((elem: any) =>
          co.aSequencias.forEach(campo => {
            this.postCondicaoSequencia(elem.Cod_Condicao, campo.Cod_Sequencia).subscribe();
          })
        )
      )
      .toPromise();
  }

  editCondicao(co: Condicion): Promise<any> {
    return this.http
      .put(
        this.url + '/condicao/' + co.sCodCondicion + '/',
        {
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
        },
        { headers: { 'Content-type': 'application/json' } }
      )
      .pipe(
        map((elem: any) =>
          co.aSequencias.forEach(campo => {
            this.postCondicaoSequencia(elem.Cod_Condicao, campo.Cod_Sequencia).subscribe();
          })
        )
      )
      .toPromise();
  }

  async deleteRelation(id: any) {
    await this.http
      .delete(this.url + '/condicaosequencia/' + id + '/', {
        headers: { 'Content-type': 'application/json' }
      })
      .toPromise();
  }

  getLastCondicao(): Promise<any> {
    return this.http
      .get(this.url + '/condicao/last/', {
        headers: { 'Content-type': 'application/json' }
      })
      .toPromise();
  }

  deleteCondicaoSequencia(id: any) {
    const arr: any = [];
    const getSequenciasCondicao = this.http
      .get(this.url + '/condicaosequencia/', {
        headers: { 'Content-type': 'application/json' }
      })
      .toPromise();
    getSequenciasCondicao.then((elems: any) => {
      elems.map((sc: any) => {
        if (sc.id_Condicao === id) {
          arr.push(sc);
        }
      });
      arr.map((sc: any) => {
        this.deleteRelation(sc.id);
      });
    });
  }

  postCondicaoSequencia(condId, seqId) {
    return this.http.post(
      this.url + '/condicaosequencia/',
      {
        Cod_Condicao: condId,
        Cod_Sequencia: seqId
      },
      { headers: { 'Content-type': 'application/json' } }
    );
  }

  public getCondicaoByCode(val: any): Promise<any> {
    return this.http
      .get(this.url + '/condicao/' + val + '/', {
        headers: { 'Content-type': 'application/json' }
      })
      .toPromise();
  }

  public getCondicaos(): Promise<any> {
    return this.http
      .get(this.url + '/condicao/', {
        headers: { 'Content-type': 'application/json' }
      })
      .toPromise();
  }

  public getCondicaoCamada(): Promise<any> {
    return this.http
      .get(this.url + '/condicaocamada/', {
        headers: { 'Content-type': 'application/json' }
      })
      .toPromise();
  }

  public getCamadaEsquema(): Promise<any> {
    return this.http
      .get(this.url + '/camadaesquema/', {
        headers: { 'Content-type': 'application/json' }
      })
      .toPromise();
  }

  /*
      Andrés Atencio 14/03/2020
      Get condicao by camada schema
      based on base vendas type
    */
  public getCondicaoCamadaByCamadaEsquema(baseVendas: string): Promise<any> {

    const fetchData = () => {
      const camadas = this.getCamadas();
      const camadaEsquemas = this.getCamadaEsquema();
      const condicaoCamadas = this.getCondicaoCamada();
      const condicaos = this.getCondicaos();
      return [camadas, camadaEsquemas, condicaoCamadas, condicaos];
    };

    const filterCamadaByBaseVendas = baseType => e =>
      e.TIPO_BASE_VENDAS === baseType;

    const promise = new Promise((resolve, reject) => {

      Promise.all(fetchData()).then(
        ([camadas, camadaEsquemas, condicaoCamadas, condicaos]) => {
          const camadasFiltered = camadas.filter(
            filterCamadaByBaseVendas(baseVendas)
          );

          const camadasFullData = camadasFiltered.map(camada => {
            const filterCondicaoCamadaByCamadaEsquema = (
              camadaEsquemas,
              condicaoCamadas
            ) => {
              return camadaEsquemas.map(camadaEsquema => {
                return condicaoCamadas.filter(
                  condCamada =>
                    condCamada.id == camadaEsquema.id_Condicao_Camada
                )[0];
              });
            };
            const condicaoCamadasFiltered = filterCondicaoCamadaByCamadaEsquema(
              camadaEsquemas,
              condicaoCamadas
            );

            const filterCondicaosByCondicaoCamada = (
              condicaoCamadasFilter,
              condicaos
            ) => {
              return condicaoCamadasFilter.map(condCamada => {
                return condicaos.filter(
                  cond => cond.id == condCamada.id_Condicao
                )[0];
              });
            };

            const condicaosFiltered = filterCondicaosByCondicaoCamada(
              condicaoCamadasFiltered,
              condicaos
            );

            let condicaosByCamadaFilter = condicaosFiltered.filter(
              cond => cond.id_Camada == camada.id
            );

            const condicaosAllow = (camada, condicaos) => {
              const condicaosCamadasFiltered = condicaoCamadas.filter(
                condCam => condCam.id_Camada == camada.id
              );
              return condicaosCamadasFiltered.map(condCamada => {
                return condicaos.filter(
                  cond => cond.id == condCamada.id_Condicao
                )[0];
              });
            };

            const condicaosAllowed = condicaosAllow(camada, condicaos);

            return {
              camada,
              condicaosAllow: condicaosAllowed,
              condicaos: condicaosByCamadaFilter
            };
          });

          resolve(camadasFullData)
        }
      ).catch(err => reject(`Error getCondicaoCamadaByCamadaEsquema(${baseVendas})`));
    });

    return promise;
  }
}
