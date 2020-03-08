import { Component, OnInit, Renderer2} from '@angular/core';
import { Condicion } from '../../models/condicion';
import { MetadataService } from './../../services/metadata.service';
import { CondicionService } from '../../services/condicion.service';
import { fromEvent } from 'rxjs';
import { tap, switchMap } from "rxjs/operators";



declare var $: any;

@Component({
  selector: 'app-condicion',
  templateUrl: './condicion.component.html',
  styleUrls: ['./condicion.component.scss'],
  providers: [MetadataService, CondicionService]
})
export class CondicionComponent implements OnInit {

  public _condicion: Condicion;
  public _sequencias: Array<any>;
  public _chaveContas: Array<any>;
  public _tipoValor: Array<any>;
  public _camadas: Array<any>;
  public listaCondicionesComp: Array<any>;
  public selectedProperties: Array<any>;
  IsSaving: boolean = false;

   constructor(
    private _metadataService: MetadataService,
    private _condicionService: CondicionService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {

    $('#myModal').modal('show')
    this._sequencias = new Array<any>();
    this._chaveContas = new Array<any>();
    this._tipoValor = new Array<any>();
    this._camadas = new Array<any>();
    this.listaCondicionesComp = new Array<any>();
    this.selectedProperties = new Array<any>();
    this._condicion = new Condicion();

    this._condicionService.getSequenciasAcesso().then(
      result => result.map(sa => this._tipoValor.push(sa))
    )

    this._condicionService.getChaveContas().then(
      result => result.map(cc => this._tipoValor.push(cc))
    )
    
    this._condicionService.getTiposValor().then(
      result => result.map(tv => this._tipoValor.push(tv))
    )

    this._condicionService.getCamadas().then(
      result => result.map(ca => this._tipoValor.push(ca))
    )
    
  }

  //Test Function , remove when finish

  getModel(){
    console.log(this._condicion)
  }

    /* Charlie Minnelli - 08/03/2020
     Input: null
     Output: null
     This function updates the condition description
  */
  public updateCondDescription(idCond) {
    // console.log("pasando parametro ID COND a API: " + idCond);
    // this._condicionService.getCondicao().subscribe((values) => {
    //   this._condicion.sDesCondicion = values.des // check how returns json data
    // });
  }

    /* Charlie Minnelli - 08/03/2020
     Input: null
     Output: null
     This function updates the condition account key
  */

public updateCondChave() {
  /* this._condicionService.getCondChave().subscribe((values) => {
    console.log(values)
  }); */
}
    /* Charlie Minnelli - 08/03/2020
     Input: null
     Output: null
     This function updates the condition of layer
  */

public updateCondCamada() {
  /* this._condicionService.getCondCamada().subscribe((values) => {
    console.log(values)
  }); */
}

    /* Charlie Minnelli - 08/03/2020
     Input: null
     Output: null
     This function updates the condition type value
  */

public updateCondVal() {
  /* this._condicionService.getCondVal().subscribe((values) => {
    console.log(values)
  }); */
}



  Save(){
    $('#myModal').modal('hide')
    this.IsSaving = true;
  }

  public checkValue(tipo){

    this._sequencias.map(elem => {
      if(elem.tipo == tipo){
        if(elem.selected){
          elem.selected = false;
          this.selectedProperties.forEach((elem, index) => {
            if(elem.tipo == tipo){
              this.selectedProperties.splice(index, 1);
            }
          })
        }else{
          elem.selected = true;
          this.selectedProperties.push(elem);
        }
      }
    })

    var descripcion = '';
    this.selectedProperties.forEach((elem, index) => {
      if(index == 0){
        descripcion = descripcion + elem.tipo;
      }else{
        descripcion = descripcion + '/' + elem.tipo;
      }
    })

   // this._condicion.sDesAcceso = descripcion;

  }

  onClickRemove(){
   this.selectedProperties.splice(this.selectedProperties.findIndex(e => e.tipo === this.selectedProperties[0].tipo),1)
   console.log(this.selectedProperties)
    // this.checkbox = null;
    //this.listaCondiciones[0].selected = false;
    this.removeCheckbox();
  }

  removeCheckbox(): void {
    debugger;
    let input = this.renderer.selectRootElement('.sacceso-opcion');
    this.renderer.setProperty(input, 'checked', false);
    }

}
