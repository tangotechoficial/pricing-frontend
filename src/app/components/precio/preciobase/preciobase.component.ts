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
  camadasUpdate = { ADD: {}, UPDATE: {}, REMOVE: {}};
  camadasFullData: any = [];
  bBusiness: boolean;
  loading = true;
  typeBaseVendasDesc = '';
  typeBaseVendas = '';
  typeBase;


  constructor(
    public condicionService: CondicionService,
    private spinner: NgxSpinnerService,
    public esquemasService: EsquemasService
  ) { }

  ngOnInit() {

    this.spinner.show();

    /*
      Pablo Gerez 12/03/2020
      Gets type of user to validate
      which component will be shown
    */
    this.loading = true;
    this.checkTypeUser();
    this.checkTypeBaseVendas();
    this.fetchData();
  }

  checkTypeUser() {
    if (this.sCurrentUser.groups[0].name !== 'business') {
      this.bBusiness = false;
    } else {
      this.bBusiness = true;
    }
  }

  checkTypeBaseVendas() {
    this.typeBaseVendas = window.location.pathname === '/preciobase' ? 'B' : 'V';
    this.typeBaseVendasDesc = this.typeBaseVendas === 'B' ? 'Base' : 'Vendas';
    this.typeBase = window.location.pathname === '/preciobase' ? true : false;
  }

  fetchData() {
    this.esquemasService
      .fetchCondicaoCamadaEsquema(this.typeBaseVendas)
      .then(camadasFullData => {
        this.stopLoading();
        this.camadasFullData = camadasFullData;
        console.log(camadasFullData);
      })
      .catch(err => {
        this.stopLoading();
      });
  }

  stopLoading() {
    this.loading = false;
    this.spinner.hide();
  }

  updateCamada({camada, condicaos, action}) {
    // tslint:disable-next-line: max-line-length
    this.camadasUpdate[action][camada.Cod_Camada] ? this.camadasUpdate[action][camada.Cod_Camada].push(condicaos) : this.camadasUpdate[action][camada.Cod_Camada] = [condicaos];
  }


  submiteEsquema() {
    // console.log({camadasUpdate: this.camadasUpdate})
    $('#myModalPrecioBase').modal('show');
    const promisesAddCondCamadaEsq: Array<any> = Object.keys(this.camadasUpdate.ADD).map(codCamada => {
      return this.camadasUpdate.ADD[codCamada].map(cond => {
          // new relations
          const objCondCamadaEsq = {
            Cod_Esquema_Calculo: 'EC000', // CAMBIAR PARA VENTAS
            Cod_Condicao: cond.Cod_Condicao,
            Cod_Camada: codCamada
          };
          return this.esquemasService.postEsquema(objCondCamadaEsq);
      });
    });

    const promisesRemoveCondCamadaEsq: Array<any> = Object.keys(this.camadasUpdate.REMOVE).map(codCamada => {
      return this.camadasUpdate.REMOVE[codCamada].map(cond => {
         return this.esquemasService.removeEsquema({id: cond.idCondicaoCamadaEsquema});
      });
    });

    const promisesUpdateCondCamadaEsq: Array<any> = Object.keys(this.camadasUpdate.UPDATE).map(codCamada => {
      return this.camadasUpdate.UPDATE[codCamada].map(cond => {
        cond.MANDATORIA = cond.MANDATORIA ? 1 : 0;
        cond.ESTATISTICA = cond.ESTATISTICA ? 1 : 0;
        return this.esquemasService.updateCondicao(cond);
      });
    });

    const promisesCondCamadaEsq = [].concat(...[promisesAddCondCamadaEsq, promisesRemoveCondCamadaEsq, promisesUpdateCondCamadaEsq]);


    Promise.all(promisesCondCamadaEsq)
      .then(this.verifyErrorFetchData)
      .then(data => {
        console.log('oks');
        console.log({data});
      })
      .catch(err => {
        $('#myModalPrecioBaseError').modal('show');
        console.log(err);
      });

    this.camadasUpdate = {ADD: {}, UPDATE: {}, REMOVE: {}};
  }

  verifyErrorFetchData(data) {
    const error = data[0][0].__zone_symbol__value ? data[0][0].__zone_symbol__value : false;
    console.log({error});
    if (error) {
      throw error.name;
    } else {
      return data;
    }
  }

  parseResponseCamada(data) {
    return data.filter(e => e.TIPO_BASE_VENDAS === 'B');
  }

  closePopUp() {
    $('#myModalPrecioBase').modal('hide');
    $('#myModalPrecioBaseError').modal('hide');
  }


}
