import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CondicionService } from '../../../services/condicion.service';
import { ModelCondicao } from 'app/models/condicion.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'precio-technical',
  templateUrl: './precio-technical.component.html',
  styleUrls: ['../../precio/precio.component.scss'],
  providers: [CondicionService]
})
// tslint:disable-next-line: component-class-suffix
export class PrecioTechnical {
  @Input() titulo: string;
  @Input() camada: any;
  @Output() selectedObject: EventEmitter<any> = new EventEmitter<any>();
  public camadaU: any;
  public condicaos: Array<any> = [];
  public condicaosAllow: Array<any> = [];
  public isEditNew = false;
  public isEditCondicao = false;
  public condicaoUpdateCod = null;
  public loading = true;
  public modelCondicao: ModelCondicao;
  public bSelectCondicao = false;
  public globalIndex = 0;
  public tipoValor: Array<any>;

  constructor( private condicionService: CondicionService) {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {

    this.tipoValor = new Array<any>();
    this.condicaos = new Array<any>();
    this.condicaosAllow = this.camada.condicaosAllow;
    this.camadaU = this.camada.camada;
    this.tipoValor = this.camada.tipoValor;

    const condicaos = this.camada.condicaos.map(cond => {
      const tipValor = this.tipoValor.filter(tipoValor => tipoValor.cod_tipovalor === cond.cod_tipovalor)[0]
      cond.desc_tipovalor = tipValor.desc_tipovalor;
      return new ModelCondicao(cond)
    })
    this.condicaos = condicaos
    
  }

  add() {
    this.isEditNew = true;
    this.modelCondicao = new ModelCondicao({});
    this.globalIndex = this.condicaos.length;
    this.condicaos.push(this.modelCondicao);
    this.camadaU.condicaos = new Array<any>();
    this.camadaU.condicaos = this.condicaos;
  }

  remove(val: any) {
    this.condicaos.map((elem, index) => {
      if (elem.cod_condicao === val) {
        this.condicaos.splice(index, 1);
        this.selectedObject.emit({action: 'REMOVE', camada: this.camadaU, condicaos: elem});
      }
    });
  }

  cancel() {
    this.condicaos.pop();
  }

  onCloseCondicaoPopUp(val: any) {
    this.bSelectCondicao = false;
  }

  selectCondicao(val, isEditNew) {
    // console.log({val, isEditNew})
    if (isEditNew && !this.isEditCondicao) {
      this.addCondicao(val)
    } else {
      this.updateCondicao(val)
    }
    this.isEditCondicao = false
  }


  addCondicao(val){
    const modelcondicao = this.camada.condicaosAllow.filter(cond => cond.Cod_Condicao === val.sCodCondicion)[0]
    const tipValor = this.tipoValor.filter(tipoValor => tipoValor.Cod_TipoValor === modelcondicao.Cod_TipoValor)[0]
    modelcondicao.Desc_TipoValor = tipValor.Desc_TipoValor
    this.condicaos[this.condicaos.length - 1].set(modelcondicao)
    this.selectedObject.emit({action: 'ADD', camada: this.camadaU, condicaos: modelcondicao});
    this.isEditNew = false;
  }

  

  updateCondicao(val){
    const modelcondicao = this.camada.condicaosAllow.filter(cond => cond.Cod_Condicao === val.sCodCondicion)[0]
    const tipValor = this.tipoValor.filter(tipoValor => tipoValor.Cod_TipoValor === modelcondicao.Cod_TipoValor)[0]
    modelcondicao.Desc_TipoValor = tipValor.Desc_TipoValor
    this.condicaos.forEach(cond => {
      if (cond.Cod_Condicao === this.condicaoUpdateCod) {
        cond.set(modelcondicao)
      }
    })
  }


  launchModal(condicao) {
    this.isEditCondicao = condicao.Cod_Condicao ? true : false
    this.condicaoUpdateCod = condicao.Cod_Condicao ? condicao.Cod_Condicao : null
    this.bSelectCondicao = true;
  }

  updateMandatoria(condicao) {
    console.log({condicao})
    this.selectedObject.emit({action: 'UPDATE', camada: this.camadaU, condicaos: condicao});
  }

  updateEstadistica(condicao) {
    console.log({condicao})
    this.selectedObject.emit({action: 'UPDATE', camada: this.camadaU, condicaos: condicao});
  }
}