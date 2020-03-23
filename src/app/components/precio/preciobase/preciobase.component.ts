import { Component, OnInit } from '@angular/core';
import { CondicionService } from '../../../services/condicion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EsquemasService } from '../../../services/esquemas.service';

declare var $: any;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'preciobase',
  templateUrl: './preciobase.component.html',
  styleUrls: ['../../precio/precio.component.scss'],
  providers: [CondicionService, NgxSpinnerService, EsquemasService]
})
export class PrecioBaseComponent implements OnInit {
  sCurrentUser = JSON.parse(localStorage.getItem('User'));
  camadasUpdate = { "ADD": {}, "UPDATE": {}, "REMOVE": {}};
  camadasFullData: any = [];
  bBusiness: boolean;

  condicao: any = [];
  tipoValor: any = [];
  condicaos: any = [];
  camadas = [];
  loading = true;


  // public precoBaseCamadas: Array<any>;
  // public postPrecoBase: Array<any>;

  constructor(
    private condicionService: CondicionService,
    private spinner: NgxSpinnerService,
    private esquemasService: EsquemasService
  ) { }

  ngOnInit() {

    this.spinner.show();

    /*
      Pablo Gerez 12/03/2020
      Gets type of user to validate
      which component will be shown
    */
    if (this.sCurrentUser.type !== "technical") {
      this.bBusiness = true;
    } else {
      this.bBusiness = false;
    }
    this.loading = true;
    this.tipoValor = new Array<any>();
    this.camadas = new Array<any>();
    this.condicaos = new Array<any>();
    this.camadasFullData = new Array<any>();
    // this.precoBaseCamadas = new Array<any>();

    Promise.all([
      this.condicionService.getTiposValor(),
      this.condicionService.getCamadas(),
      this.condicionService.getCondicaos(),
      this.esquemasService.getEsquemaRelation()
    ]).then(([tipoValor,camadas,condicaos, esquemaRelations]) => {
      
      this.tipoValor = tipoValor
      this.camadas = camadas
      this.condicaos = condicaos

      this.camadas = this.camadas.filter((camada: any) => camada.TIPO_BASE_VENDAS === 'B');
      
      this.camadas.forEach(elem => {
        const esquemaRelationsFiltered = esquemaRelations.filter(esqRel => esqRel.Cod_Camada === elem.Cod_Camada)   
        const condicaosFiltered = esquemaRelationsFiltered.map(esqRel => {
          const condicaoWithIdRelation = this.condicaos.filter(cond => cond.Cod_Condicao == esqRel.Cod_Condicao)[0]
          condicaoWithIdRelation.idCondicaoCamadaEsquema = esqRel.id
          return condicaoWithIdRelation
        })
        
        this.camadasFullData.push({
          camada: elem,
          condicaos: condicaosFiltered,
          condicaosAllow: this.condicaos.filter((cond: any) => cond.Cod_Camada === elem.Cod_Camada),
          tipoValor: this.tipoValor
        });
        if (this.camadas.length === this.camadasFullData.length) {
          this.loading = false;
          this.spinner.hide();
        }
      });
    });
  }

  updateCamada({camada, condicaos, action}) {
    this.camadasUpdate[action][camada.Cod_Camada] ? this.camadasUpdate[action][camada.Cod_Camada].push(condicaos) : this.camadasUpdate[action][camada.Cod_Camada] = [condicaos]
  }


  submiteEsquema() {
    // console.log({camadasUpdate: this.camadasUpdate})

    let promisesAddCondCamadaEsq: Array<any> = Object.keys(this.camadasUpdate["ADD"]).map(codCamada => {
      return this.camadasUpdate["ADD"][codCamada].map(cond => {
          // new relations
          const objCondCamadaEsq = {
            Cod_Esquema_Calculo: "EC000",
            Cod_Condicao: cond.Cod_Condicao,
            Cod_Camada: codCamada
          }
         return this.esquemasService.postEsquema(objCondCamadaEsq)
        
      })
    })

    let promisesRemoveCondCamadaEsq: Array<any> = Object.keys(this.camadasUpdate["REMOVE"]).map(codCamada => {
      return this.camadasUpdate["REMOVE"][codCamada].map(cond => {
        
         return this.esquemasService.removeEsquema({id: cond.idCondicaoCamadaEsquema})
        
      })
    })

    let promisesUpdateCondCamadaEsq: Array<any> = Object.keys(this.camadasUpdate["UPDATE"]).map(codCamada => {
      return this.camadasUpdate["UPDATE"][codCamada].map(cond => {
        cond.MANDATORIA = cond.MANDATORIA ? 1 : 0
        cond.ESTATISTICA = cond.ESTATISTICA ? 1 : 0
        return this.esquemasService.updateCondicao(cond)
        
      })
    })

    // const promisesCondCamadaEsq = [].concat(...[promisesUpdateCondCamadaEsq]);
    const promisesCondCamadaEsq = [].concat(...[promisesAddCondCamadaEsq, promisesRemoveCondCamadaEsq, promisesUpdateCondCamadaEsq]);

    Promise.all(promisesCondCamadaEsq)
      .then(data => {
        console.log("oks")
      })
      .catch(err => {
        console.log(err)
      })

    this.camadasUpdate = { "ADD": {}, "UPDATE": {}, "REMOVE": {}}
  }

  parseResponseCamada(data) {
    return data.filter(e => e.TIPO_BASE_VENDAS === "B");
  }


}
