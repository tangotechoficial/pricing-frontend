import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Condicion } from '../models/condicion';
import { map } from 'rxjs/operators';
import { Sequencia } from 'app/models/sequencia';
import { Condicao } from 'app/models/condicao';
import { ChaveContas } from 'app/models/chavecontas';
import { TipoValor } from 'app/models/tipovalor';
import { Camada } from 'app/models/camadas';
import { compileDirectiveFromRender2 } from '@angular/compiler/src/render3/view/compiler';
import { environment } from '@env/environment';


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

  getCamadasAndCondicaos(): Promise<Camada[]> {
    return this.http
      .get(this.url + '/camadacond/', {
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
      .then((data: any) => {
        return data.results as TipoValor[];
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
    condicion.sequencias.map(elem => codSequencias.push(elem.cod_sequencia));
    return this.http
      .post(
        this.url + '/condicao/',
        {
          cod_condicao: condicion.cod_condicao,
          desc_condicao: condicion.desc_condicao,
          escala_qtde: condicion.escala_qtde ? 1 : 0,
          pos_neg: condicion.pos_neg ? 'N' : 'P',
          tip_base_vendas: condicion.tip_base_vendas,
          mandatoria: condicion.mandatoria ? condicion.mandatoria : 0,
          estatistica: condicion.estatistica ? condicion.estatistica : 0,
          cod_camada: condicion.camada.cod_camada,
          cod_chavecontas: condicion.chavecontas.cod_chavecontas,
          cod_tipovalor: condicion.tipovalor.cod_tipovalor,
          sequencias: codSequencias
        },
        { headers: { 'Content-type': 'application/json' } }
      )
      .toPromise();
  }

  putCondicao(condicion: Condicao): Promise<any> {
    const codSequencias = [];
    this.deleteRelationSequenciaCondicao(condicion.cod_condicao);
    condicion.sequencias.map(elem => codSequencias.push(elem.cod_sequencia));
    if (codSequencias) {
      codSequencias.map(elem => {
        console.log(elem);
        console.log(condicion.cod_condicao)
        this.postRelationSequenciaCondicao(condicion.cod_condicao, elem);
      });
    }
    return this.http
      .put(
        this.url + '/condicao/' + condicion.cod_condicao + '/',
        {
          cod_condicao: condicion.cod_condicao,
          desc_condicao: condicion.desc_condicao,
          escala_qtde: condicion.escala_qtde ? 1 : 0,
          pos_neg: condicion.pos_neg ? 'N' : 'P',
          tip_base_vendas: condicion.tip_base_vendas,
          mandatoria: condicion.mandatoria ? condicion.mandatoria : 0,
          estatistica: condicion.estatistica ? condicion.estatistica : 0,
          cod_camada: condicion.camada.cod_camada,
          cod_chavecontas: condicion.chavecontas.cod_chavecontas,
          cod_tipovalor: condicion.tipovalor.cod_tipovalor,
          sequencias: codSequencias
        },
        { headers: { 'Content-type': 'application/json' } }
      )
      .toPromise();
  }

  postRelationSequenciaCondicao(codcon: any, codseq: any): Promise <any> {
    return this.http
      .post(this.url + '/sequenciacondicao/', {
        id: codcon + codseq,
        cod_condicao: codcon,
        cod_sequencia: codseq
      }, {
        headers: { 'Content-type': 'application/json' }
      })
      .toPromise();
  }

  deleteRelationSequenciaCondicao(id: any) {
    this.getCondicaoByCode(id)
      .then((result: any) => {
        result.sequencias.map((elem: any) => {
          return this.http
            .delete(this.url + '/sequenciacondicao/' + id + elem.cod_sequencia + '/', {
              headers: { 'Content-type': 'application/json' }
            })
            .toPromise();
        });
      });
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

  deleteCondicaoRelacao(): Promise<any> {
    return this.http
      .delete(this.url + '/sequenciacondicao/', {
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
