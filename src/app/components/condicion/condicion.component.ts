import { Component, OnInit, Renderer2 } from '@angular/core';
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
  public bCreateMode: boolean = true;
  public sSeleccionPlaceholder: string = "Selecione uma opção";

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
      result => result.map(sa => this._sequencias.push(sa))
    )

    this._condicionService.getChaveContas().then(
      result => {
        result.map(cc => this._chaveContas.push(cc))
        console.log(this._tipoValor)
      }
    )

    this._condicionService.getTiposValor().then(
      result => result.map(tv => this._tipoValor.push(tv))
    )

    this._condicionService.getCamadas().then(
      result => result.map(ca => this._camadas.push(ca))
    )

  }

  /*
    Iván Lynch 08/03/2020
    Input: Selected Camada Item from dropdown
    Output: Update this._condicao.oCamada
  */
  public getSelectedCamada(val: any) {
    this._condicion.oCamada = val;
  }

  /*
    Iván Lynch 08/03/2020
    Input: Selected Camada Item from dropdown
    Output: Update this._condicao.oCamada
  */
  public getSelectedChaveContas(val: any) {
    this._condicion.oChaveContas = val;
  }

  /*
    Iván Lynch 08/03/2020
    Input: Selected TipoValor Item from dropdown
    Output: Update this._condicao.oTipoValor
  */
  public getSelectedTipoValor(val: any) {
    this._condicion.oTipoValor = val;
  }

  /*
    Iván Lynch 08/03/2020
    Output: Return true if the user clicks on Criar condiçao
  */
  public isCreateMode() {
    $('#myModal').modal('hide')
    this.bCreateMode = true;
  }

  /*
    Iván Lynch 08/03/2020
    Output: Return false if the user clicks on Alterar condiçao
  */
  public isEditMode() {
    $('#myModal').modal('hide')
    this.bCreateMode = false;
  }

  /*
    Iván Lynch 08/03/2020
    Output: Uncheck Pos and Neg checkbox if the other is active
  */
  public checkPosNeg(e: any){
    var checkPos, checkNeg;
    checkPos = document.getElementById('checkPositivo');
    checkNeg = document.getElementById('checkNegativo');
    
    if(e.target.id == "checkNegativo" && checkPos.checked){
      checkPos.click()
    }

    if(e.target.id == "checkPositivo" && checkNeg.checked){
      checkNeg.click()
    }
    
  }

  /*
    Iván Lynch 08/03/2020
    Input: Object, Array
    Output: Return true if exists in the array or false if doesn't exist
  */
  public elemExist(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }
    return false;
  }
  
  /*
    Iván Lynch 08/03/2020
    Input: Object
    Output: Push the object to selectedProperties array if the element is not in the array or delete them
  */
  public checkValue(sa: any) {
    //Check if selectedProperties array is empty
    if(this.selectedProperties.length < 1){
      //If array is empty push current elem
      this.selectedProperties.push(sa);
    }else{
      //If the array is not empty and current element exist in the array
      if(this.elemExist(sa, this.selectedProperties)){
        //Remove object from array
        this.selectedProperties = this.selectedProperties.filter((obj) => {
          return obj.id !== sa.id
        })
      }else{
        //If the element doesn't exist push item to selectedProperties
        this.selectedProperties.push(sa);
      }
    }
    
    
  }

  onClickRemove() {
    this.selectedProperties.splice(this.selectedProperties.findIndex(e => e.tipo === this.selectedProperties[0].tipo), 1)
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
