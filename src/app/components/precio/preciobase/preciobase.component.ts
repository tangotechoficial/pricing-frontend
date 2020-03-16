import { Component, OnInit } from '@angular/core';
import { CondicionService } from '../../../services/condicion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EsquemasService } from '../../../services/esquemas.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'preciobase',
  templateUrl: './preciobase.component.html',
  styleUrls: ['../../precio/precio.component.scss'],
  providers: [CondicionService, NgxSpinnerService, EsquemasService]
})
export class PrecioBaseComponent implements OnInit {
  public sCurrentUser = JSON.parse(localStorage.getItem('User'));
  public bBusiness: boolean;

  camadas = [];
  isShow: boolean;
  existNegocios: any;
  existVentas: any;
  loading = true;
  public condicao: Array<any>;
  tipoValor: any[];
  condicaos: any[];
  camdasFullData: any[];
  camadasFullData: any[];
  public precoBaseCamadas: Array<any>;
  public postPrecoBase: Array<any>;

  constructor(
    private condicionService: CondicionService,
    private spinner: NgxSpinnerService,
    private esquemasService: EsquemasService
  ) { }

  ngOnInit() {

    this.spinner.show();
    this.getCamadasValues();
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
    this.loading = true;
    this.tipoValor = new Array<any>();
    this.camadas = new Array<any>();
    this.condicaos = new Array<any>();
    this.camadasFullData = new Array<any>();
    this.precoBaseCamadas = new Array<any>();

    Promise.all([
      this.condicionService.getTiposValor().then(result => result.map(tv => this.tipoValor.push(tv))),
      this.condicionService.getCamadas().then(result => result.map(ca => this.camadas.push(ca))),
      this.condicionService.getCondicaos().then(result => result.map(co => this.condicaos.push(co)))
    ]).then(result => {
      this.camadas = this.camadas.filter((camada: any) => camada.TIPO_BASE_VENDAS === 'B');
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

  public elemExist(obj, list) {
    for (const row of list) {
      if (row.Cod_Camada === obj.Cod_Camada) {
        return true;
      }
    }
    return false;
  }

  updateCamada(val: any) {
    if (this.precoBaseCamadas.length < 1) {
      this.precoBaseCamadas.push(val);
    } else {
      this.precoBaseCamadas = this.precoBaseCamadas.filter((obj: any) => {
        return obj.Cod_Camada !== val.Cod_Camada;
      });
      console.log(this.precoBaseCamadas);
      this.precoBaseCamadas.push(val);
    }
  }

  getCamadasValues() {
    this.esquemasService.getEsquema()
      .then(elems => {
        /*
          0 - Esquema
          1 - Camada
          2 - Condicao
        */
        elems[0] = elems[0].filter(elem => elem.Cod_Esquema_Calculo === 'EC000');
        
      });
  }

  submiteEsquema() {
    this.postPrecoBase = new Array<any>();
    this.precoBaseCamadas.map(elem => {
      elem.condicaos.forEach(cond => {
        const obj = {
          ESQ: 'EC000',
          CAM: '',
          CON: ''
        };
        obj.CAM = elem.Cod_Camada;
        obj.CON = cond.Cod_Condicao;
        this.postPrecoBase.push(obj);
      });
    });
    this.postPrecoBase.forEach(elem => {
      this.esquemasService.postEsquema(elem);
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
