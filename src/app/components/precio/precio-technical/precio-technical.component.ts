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

  public condicaosShow: Array<any> = [];

  constructor( private condicionService: CondicionService) {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {

    this.tipoValor = new Array<any>();
    this.condicaos = new Array<any>();
    this.condicaosAllow = this.camada.condicaosAllow;
    this.camadaU = this.camada.camada;
    this.tipoValor = this.camada.tipoValor;

    const condicaos = this.camada.condicaos.map(cond => {
      const tipValor = this.tipoValor.filter(tipoValor => tipoValor.cod_tipovalor === cond.cod_tipovalor)[0];
      cond.desc_tipovalor = tipValor.desc_tipovalor;
      return new ModelCondicao(cond);
    });
    this.condicaos = condicaos;

    this.condicaosShow = this.condicaosAllow.filter(i => !(this.condicaos.map(j => j.cod_condicao).some(k => k == i.cod_condicao)))
    console.log({condicaos: this.condicaos, condicaosAllow: this.condicaosAllow,condicaosShow:this.condicaosShow})
  }

  add() {
    this.isEditNew = true;
    this.modelCondicao = new ModelCondicao({});
    this.globalIndex = this.condicaos.length;
    this.condicaos.push(this.modelCondicao);
    this.camadaU.condicaos = new Array<any>();
    this.camadaU.condicaos = this.condicaos;

    this.condicaosShow = this.condicaosAllow.filter(i => !(this.condicaos.map(j => j.cod_condicao).some(k => k == i.cod_condicao)))
    console.log({condicaos: this.condicaos, condicaosAllow: this.condicaosAllow,condicaosShow:this.condicaosShow})
  }

  remove(val: any) {
    this.condicaos.map((elem, index) => {
      if (elem.cod_condicao === val) {
        this.condicaos.splice(index, 1);
        this.selectedObject.emit({action: 'REMOVE', camada: this.camadaU, condicaos: elem});
      }
    });
    
    this.condicaosShow = this.condicaosAllow.filter(i => !(this.condicaos.map(j => j.cod_condicao).some(k => k == i.cod_condicao)))
    console.log({condicaos: this.condicaos, condicaosAllow: this.condicaosAllow,condicaosShow:this.condicaosShow})

    this.isEditNew = false
  }

  
  cancel() {
    this.condicaos.pop();
  }

  onCloseCondicaoPopUp(val: any) {
    this.bSelectCondicao = false;
  }

  selectCondicao(val, isEditNew) {
    console.log({val, isEditNew})
    if (isEditNew && !this.isEditCondicao) {
      this.addCondicao(val);
    } else {
      this.updateCondicao(val);
    }
    this.isEditCondicao = false;
  }


  addCondicao(val){
    
    const modelcondicao = this.camada.condicaosAllow.filter(cond => cond.cod_condicao === val.cod_condicao)[0]
    const tipValor = this.tipoValor.filter(tipoValor => tipoValor.cod_tipovalor === modelcondicao.cod_tipovalor)[0]
    modelcondicao.desc_tipovalor = tipValor.desc_tipovalor
    this.condicaos[this.condicaos.length - 1].set(modelcondicao)
    this.selectedObject.emit({action: 'ADD', camada: this.camadaU, condicaos: modelcondicao});
    this.isEditNew = false;
    
    this.condicaosAllow = this.condicaosAllow.filter(e => e.cod_condicao != val.cod_condicao)
  }

  

  updateCondicao(val){
    const modelcondicao = this.camada.condicaosAllow.filter(cond => cond.cod_condicao === val.cod_condicao)[0]
    const tipValor = this.tipoValor.filter(tipoValor => tipoValor.cod_tipovalor === modelcondicao.cod_tipovalor)[0]
    modelcondicao.desc_tipovalor = tipValor.desc_tipovalor
    this.condicaos.forEach(cond => {
      if (cond.cod_condicao === this.condicaoUpdateCod) {
        cond.set(modelcondicao)
      }
    });
  }


  launchModal(condicao) {
    this.isEditCondicao = condicao.cod_condicao ? true : false
    this.condicaoUpdateCod = condicao.cod_condicao ? condicao.cod_condicao : null
    this.bSelectCondicao = true;
  }

  updateMandatoria(condicao) {
    // console.log({condicao})
    this.selectedObject.emit({action: 'UPDATE', camada: this.camadaU, condicaos: condicao});
  }

  updateEstadistica(condicao) {
    // console.log({condicao})
    this.selectedObject.emit({action: 'UPDATE', camada: this.camadaU, condicaos: condicao});
  }
}
