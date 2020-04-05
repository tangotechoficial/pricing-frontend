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
    this.url = Global.url;
    // this.url = "http://localhost:8000/api";
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

  getEsquemaRelation(): Promise<[]> {
    return this.http
      .get(this.url + "/condicaocamadaesquema/", {
        headers: { "Content-type": "application/json" }
      })
      .toPromise()
      .then((data: any) => {
        return data.results
      })
      .catch(err => {
        return new Error("")
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
          ]).then(([tipoValor,camadas,condicaos, esquemaRelations]) => {
            console.log({tipoValor,camadas,condicaos, esquemaRelations})
            
            // Filter camadas by TIPO_BASE_VENDAS
            camadas = camadas.filter((camada: any) => camada.tipo_base_vendas === tipoBaseVendas);
            // Relations
            camadas.forEach(elem => {

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
              reject({err, msg: "Error fetchCondicaoCamadaEsquema"})
          })


    })
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
