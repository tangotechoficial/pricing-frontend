
import { Component, OnInit } from '@angular/core';
import { CondicionService } from '../../../services/condicion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EsquemasService } from 'app/services/esquemas.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'precioventa',
  templateUrl: './precioventa.component.html',
  styleUrls: ['../../precio/precio.component.scss'],
  providers: [CondicionService, NgxSpinnerService, EsquemasService]
})
export class PrecioVentaComponent implements OnInit {
  public sCurrentUser = JSON.parse(localStorage.getItem('User'));
  public bBusiness: boolean;

  camadas = [];
  loading = true;
  tipoValor: any[];
  condicaos: any[];
  camadasFullData: any[];
  public postPrecoVenda: any[];
  public precoVendaCamadas: any;

  constructor(
    private condicionService: CondicionService,
    private spinner: NgxSpinnerService,
    private esquemasService: EsquemasService
  ) {}

  ngOnInit() {

    this.spinner.show();

    /*
      Pablo Gerez 12/03/2020
      Gets type of user to validate
      which component will be shown
    */
    console.log(this.sCurrentUser.groups[0].name);
    if (this.sCurrentUser.groups[0].name !== 'business') {
      this.bBusiness = false;
    } else {
      this.bBusiness = true;
    }
    this.loading = true;
    this.tipoValor = new Array<any>();
    this.camadas = new Array<any>();
    this.condicaos = new Array<any>();
    this.camadasFullData = Array<any>();

    Promise.all([
      this.condicionService.getTiposValor().then(result => result.map(tv => this.tipoValor.push(tv))),
      this.condicionService.getCamadas().then(result => result.map(ca => this.camadas.push(ca))),
      this.condicionService.getCondicaos().then(result => result.map(co => this.condicaos.push(co)))
    ]).then(result => {
      this.camadas = this.camadas.filter((camada: any) => camada.TIPO_BASE_VENDAS === 'V');
      this.camadas.forEach(elem => {
        this.camadasFullData.push({
          camada: elem,
          condicaos: this.condicaos,
          condicaosAllow: this.condicaos.filter((cond: any) => cond.Cod_Camada === elem.Cod_Camada)
        });
        if (this.camadas.length === this.camadasFullData.length) {
          this.loading = false;
          this.spinner.hide();
        }
      });
    });
  }

  submiteEsquema() {
    this.postPrecoVenda = new Array<any>();
    this.precoVendaCamadas.map(elem => {
      elem.condicaos.forEach(cond => {
        const obj = {
          ESQ: 'EC000',
          CAM: '',
          CON: ''
        };
        obj.CAM = elem.Cod_Camada;
        obj.CON = cond.Cod_Condicao;
        this.postPrecoVenda.push(obj);
      });
    });
    this.postPrecoVenda.forEach(elem => {
      this.esquemasService.postEsquema(elem);
    });
  }

  updateCamada(val: any) {
    console.log(val);
  }

  parseResponseCamada(data) {
    return data.filter(e => e.TIPO_BASE_VENDAS === 'V');
  }
}
