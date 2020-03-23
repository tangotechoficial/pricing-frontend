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
  loading = true;
  typeBaseVendasDesc = ""


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

    const typeBaseVendas = window.location.pathname === '/preciobase' ? "B" : "v"
    this.typeBaseVendasDesc = typeBaseVendas == "B" ? "Base" : "Vendas"

    this.esquemasService
      .fetchCondicaoCamadaEsquema(typeBaseVendas)
      .then(camadasFullData => {
        this.stopLoading();
        this.camadasFullData = camadasFullData
      })
      .catch(err => {
        this.stopLoading();
        console.log(err)
      })
  
  }

  stopLoading() {
    this.loading = false;
    this.spinner.hide();
  }

  updateCamada({camada, condicaos, action}) {
    this.camadasUpdate[action][camada.Cod_Camada] ? this.camadasUpdate[action][camada.Cod_Camada].push(condicaos) : this.camadasUpdate[action][camada.Cod_Camada] = [condicaos]
  }


  submiteEsquema() {
    // console.log({camadasUpdate: this.camadasUpdate})
    $('#myModalPrecioBase').modal('show');
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

    const promisesCondCamadaEsq = [].concat(...[promisesAddCondCamadaEsq, promisesRemoveCondCamadaEsq, promisesUpdateCondCamadaEsq]);

    Promise.all(promisesCondCamadaEsq)
      .then(data => {
        console.log("oks")
        $('#myModalPrecioBase').modal('hide');
      })
      .catch(err => {
        console.log(err)
        $('#myModalPrecioBase').modal('hide');
      })

    this.camadasUpdate = { "ADD": {}, "UPDATE": {}, "REMOVE": {}}
  }

  parseResponseCamada(data) {
    return data.filter(e => e.TIPO_BASE_VENDAS === "B");
  }

  closePopUp() {
    $('#myModalPrecioBase').modal('hide');
  }


}
