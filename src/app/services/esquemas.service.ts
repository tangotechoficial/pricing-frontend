import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Global } from "./global";
import { CondicionService } from "./condicion.service";
import { EsquemaCalculo } from "@app/models/esquemacalculo";

@Injectable()
export class EsquemasService {
  public url: string;
  public condicion: Array<any>;
  constructor(
    private http: HttpClient,
    private condicionService: CondicionService
  ) {
    //this.url = Global.url;
    this.url = "https://pricing.tangotechapp.com/api/v1";
  }

  getMercadoria(): Promise<any> {
    return this.http
      .get(this.url + "/mercadoria/", {
        headers: { "Content-type": "application/json" }
      })
      .toPromise();
  }

  postEsquema({
    Cod_Esquema_Calculo,
    Cod_Condicao,
    Cod_Camada
  }: any): Promise<any> {
    // tslint:disable-next-line: max-line-length
    return this.http
      .post(
        this.url + "/condicaocamadaesquema/",
        { Cod_Esquema_Calculo, Cod_Condicao, Cod_Camada },
        { headers: { "Content-type": "application/json" } }
      )
      .toPromise();
  }

  removeEsquema({ id }: any): Promise<any> {
    // tslint:disable-next-line: max-line-length
    return this.http
      .delete(this.url + "/condicaocamadaesquema/" + id, {
        headers: { "Content-type": "application/json" }
      })
      .toPromise();
  }

  async getEsquema() {
    return await Promise.all([
      this.condicionService.getCamadas(),
      this.condicionService.getCondicaos()
    ]);
  }

  getFilial(): Promise<any> {
    return this.http
      .get(this.url + "/filial/", {
        headers: { "Content-type": "application/json" }
      })
      .toPromise();
  }

  getFaturamento(): Promise<any> {
    return this.http
      .get(this.url + "/faturamento/", {
        headers: { "Content-type": "application/json" }
      })
      .toPromise();
  }

  getEstado(): Promise<any> {
    return this.http
      .get(this.url + "/estado/", {
        headers: { "Content-type": "application/json" }
      })
      .toPromise();
  }

  getRegion(): Promise<any> {
    return this.http
      .get(this.url + "/region/", {
        headers: { "Content-type": "application/json" }
      })
      .toPromise();
  }

  updateCondicao(cond): Promise<any> {
    return this.http
      .put(this.url + "/condicao/" + cond.Cod_Condicao + "/", cond, {
        headers: { "Content-type": "application/json" }
      })
      .toPromise();
  }
  getEsquemaCamadaCondicion(): Promise<EsquemaCalculo[]> {
    return this.http
      .get(this.url + "/esquemacamadacondicion/", {
        headers: { "Content-type": "application/json" }
      })
      .toPromise()
      .then(result => {
        return result as EsquemaCalculo[];
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
      const promiseCondicionRelation = fetch(
        this.url + "/esquemacamadacondicion/"
      ).then(resp => resp.json());
      const promiseTipoValor = this.condicionService.getTiposValor();
      const promiseCondicaosData = this.condicionService.getCondicaos();

      Promise.all([
        promiseEsquemaCada,
        promiseTipoValor,
        promiseCondicionRelation,
        promiseCondicaosData
      ])
        .then(([data, tipoValor, condicaosRelations, condicaosData]) => {
          let camadas = data.filter(
            cam => cam.TIP_BASE_VENDAS == tipoBaseVendas
          );
          camadas = camadas[0].camadas;
          console.log({ condicaosRelations, condicaosData });
          camadas.forEach(camada => {
            const condicaosRel = condicaosRelations.filter(
              cond => cond.Cod_Camada == camada.Cod_Camada
            )[0];

            const condicaoRelData = condicaosRel.CONDICAO.map(Cod_Condicao => {
              let data =  condicaosData.filter(
                condD => condD.Cod_Condicao == Cod_Condicao
              )[0];
              data.idEsqCamCond = condicaosRel.id
              return data
            });


            const condicaosAllow = camada.condicaos.map(cond => {
                cond.idEsqCamCond = condicaosRel.id
                return cond
            })
            
            
            const data = {
              camada: camada,
              condicaos: condicaoRelData,
              condicaosAllow,
              tipoValor: tipoValor
            };

            dataCondicaoCamadaEsquema.push(data);
          });
          resolve(dataCondicaoCamadaEsquema);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  putEsquemaCamadaCondicion(esqCamCond) {
    return new Promise((resolve, reject) => {
      fetch(this.url + '/esquemacamadacondicion/' + esqCamCond.id, {
        method: 'PUT',
        body: esqCamCond,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    });
  }
}
