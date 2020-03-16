import { Component, OnInit } from '@angular/core';
import { CondicionService } from '../../../services/condicion.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'preciobase',
  templateUrl: './preciobase.component.html',
  styleUrls: ['../../precio/precio.component.scss'],
  providers: [CondicionService, NgxSpinnerService]
})
export class PrecioBaseComponent implements OnInit {

  public sCurrentUser = JSON.parse(localStorage.getItem('User'));
  public bBusiness: boolean;
  public camadas: Array<any>;
  public condicaos: Array<any>;
  public tipoValor: Array<any>;
  public camadasFullData: any;
  public isShow: boolean;
  public existNegocios: any;
  public existVentas: any;
  public loading = true;
  public condicao: Array<any>;

  constructor(
    private condicionService: CondicionService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.updateMasterData();
    /*
      Pablo Gerez 12/03/2020
      Gets type of user to validate
      which component will be shown
    */
    if (this.sCurrentUser.type !== 'technical') {
      this.bBusiness = true;
    } else {
      this.bBusiness = false;
    }
  }

  updateMasterData() {
    this.spinner.show();
    this.camadasFullData = new Array<any>();
    this.camadas = new Array<any>();
    this.condicaos = new Array<any>();
    this.tipoValor = new Array<any>();
    return Promise.all([
      this.condicionService.getTiposValor().then(result => result.map(tv => this.tipoValor.push(tv))),
      this.condicionService.getCamadas().then(result => result.map(ca => this.camadas.push(ca))),
      this.condicionService.getCondicaos().then(result => result.map(co => this.condicaos.push(co)))
    ]).then(result => {
      this.camadas = this.camadas.filter((e: any) => e.TIPO_BASE_VENDAS === 'B');
      this.camadas.map(elem => {
        this.camadasFullData.push({
          camada: elem,
          condicaos: this.condicaos,
          condicaosAllow: this.condicaos.filter((cond: any) => cond.Cod_Camada === elem.Cod_Camada)
        });
      });
      this.spinner.hide();
    });
  }

  parseResponseCamada(data) {
    return data.filter(e => e.TIPO_BASE_VENDAS === 'B');
  }

  goToSection() {
    this.isShow = !this.isShow;
  }

  parentListener($event) {
    this.existNegocios = $event;
  }

  parentListenerTwo($event) {
    this.existVentas = $event;
  }
}
