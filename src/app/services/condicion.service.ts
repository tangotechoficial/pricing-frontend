import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Condicion } from '../models/condicion';
import { map } from 'rxjs/operators';
import { Sequencia } from 'app/models/sequencia';
import { Condicao } from 'app/models/condicao';
import { ChaveContas } from 'app/models/chavecontas';
import { TipoValor } from 'app/models/tipovalor';
import { Camada } from 'app/models/camadas';
import { environment} from '@env/environment'

@Injectable()
export class CondicionService {
  public url: string;
  public condicion: Array<any>;
  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/dinamica`;
  }

  getCamadas(): Promise<Camada[]> {
    return this.http
      .get(this.url + '/camada/', {
        headers: { 'Content-type': 'application/json' }
      })
      .toPromise()
      .then((result: any) => {
        return result.results as Camada[];
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  getChaveContas(): Promise<ChaveContas[]> {
    return this.http
      .get(this.url + '/chavecontas/', {
        headers: { 'Content-type': 'application/json' }
      })
      .toPromise()
      .then((result: any) => {
        return result.results as ChaveContas[];
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  getTiposValor(): Promise<TipoValor[]> {
    return this.http
      .get(this.url + '/tipovalor/', {
        headers: { 'Content-type': 'application/json' }
      })
      .toPromise()
      .then((result: any) => {
        return result.results as TipoValor[];
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  getSequenciasAcesso(): Promise<Sequencia[]> {
    return this.http
      .get(this.url + '/sequencia/', {
        headers: { 'Content-type': 'application/json' }
      })
      .toPromise()
      .then((result: any) => {
        return result.results as Sequencia[];
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  getSequenciasByCondicao(): Promise<any> {
    return this.http
      .get(this.url + '/condicaosequencia/', {
        headers: { 'Content-type': 'application/json' }
      })
      .toPromise();
  }

  postCondicao(condicion: Condicao): Promise<any> {
    const codSequencias = [];
    condicion.sequencias.map(elem => codSequencias.push(elem.Cod_Sequencia));
    return this.http
      .post(
        this.url + '/condicao/',
        {
          Cod_Condicao: condicion.Cod_Condicao,
          Desc_Condicao: condicion.Desc_Condicao,
          Escala_Qtde: condicion.Escala_Qtde ? 1 : 0,
          POS_NEG: condicion.POS_NEG ? 'N' : 'P',
          TIP_BASE_VENDAS: condicion.TIP_BASE_VENDAS,
          MANDATORIA: 0,
          ESTATISTICA: 0,
          Cod_Camada: condicion.camada.Cod_Camada,
          Cod_ChaveContas: condicion.chavecontas.Cod_ChaveContas,
          Cod_TipoValor: condicion.tipovalor.Cod_TipoValor,
          sequencias: codSequencias
        },
        { headers: { 'Content-type': 'application/json' } }
      )
      .toPromise();
  }

  putCondicao(condicion: Condicao): Promise<any> {
    const codSequencias = [];
    condicion.sequencias.map(elem => codSequencias.push(elem.Cod_Sequencia));
    return this.http
      .post(
        this.url + '/condicao/' + condicion.Cod_Condicao + '/',
        {
          Desc_Condicao: condicion.Desc_Condicao,
          Escala_Qtde: condicion.Escala_Qtde ? 1 : 0,
          POS_NEG: condicion.POS_NEG ? 'N' : 'P',
          TIP_BASE_VENDAS: condicion.TIP_BASE_VENDAS,
          MANDATORIA: 0,
          ESTATISTICA: 0,
          Cod_Camada: condicion.camada.Cod_Camada,
          Cod_ChaveContas: condicion.chavecontas.Cod_ChaveContas,
          Cod_TipoValor: condicion.tipovalor.Cod_TipoValor,
          sequencias: codSequencias
        },
        { headers: { 'Content-type': 'application/json' } }
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

  public getCondicaoByCode(val: any): Promise<any> {
    return this.http
      .get(this.url + '/condicao/' + val + '/', {
        headers: { 'Content-type': 'application/json' }
      })
      .toPromise();
  }

  public getCondicaos(): Promise<Condicao[]> {
    return this.http
      .get(this.url + '/condicao/', {
        headers: { 'Content-type': 'application/json' }
      })
      .toPromise()
      .then((result: any) => {
        return result.results as Condicao[];
      })
      .catch(err => {
        throw new Error(err);
      });
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
