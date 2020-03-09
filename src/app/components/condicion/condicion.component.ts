import { Component, OnInit, Renderer2 } from '@angular/core';
import { Condicion } from '../../models/condicion';
import { MetadataService } from './../../services/metadata.service';
import { CondicionService } from '../../services/condicion.service';
import { fromEvent } from 'rxjs';
import { tap, switchMap } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";



declare var $: any;

@Component({
  selector: 'app-condicion',
  templateUrl: './condicion.component.html',
  styleUrls: ['./condicion.component.scss'],
  providers: [MetadataService, CondicionService, NgxSpinnerService]
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
  public _saveSucess: boolean;
  public _saveError: boolean;
  public _message: any;

  constructor(
    private _metadataService: MetadataService,
    private _condicionService: CondicionService,
    private renderer: Renderer2,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    /* Initialized message local object */
    this._message = {};
    this._message.sCodCondicion = "CO001";
    this._message.sDesCondicion = "Condicion 1";
    $('#myModal').modal('show')
    this._sequencias = new Array<any>();
    this._chaveContas = new Array<any>();
    this._tipoValor = new Array<any>();
    this._camadas = new Array<any>();
    this.selectedProperties = new Array<any>();
    this._condicion = new Condicion();
  }


  /*
    Iván Lynch 09/03/2020
    Output: Return master values
  */
  public updateMasterData(){
    this.spinner.show();
    this._sequencias = new Array<any>();
    this._tipoValor = new Array<any>();
    this._camadas = new Array<any>();
    this._chaveContas = new Array<any>();

    Promise.all([
      this._condicionService.getSequenciasAcesso().then(result => result.map(sa => this._sequencias.push(sa))),
      this._condicionService.getChaveContas().then(result => result.map(cc => this._chaveContas.push(cc))),
      this._condicionService.getTiposValor().then(result => result.map(tv => this._tipoValor.push(tv))),
      this._condicionService.getCamadas().then(result => result.map(ca => this._camadas.push(ca)))
    ]).then(()=>{
      this.spinner.hide();
    })
  }

  /*
    Iván Lynch 09/03/2020
    Output: Return selected condicao
  */
  public getCondicaoByCode(){
    this.spinner.show();
    let flag = false;
    this._condicionService.getCondicaoByCode()
      .then((result: any)=>{
        console.log(result);
        console.log(this._condicion.sCodCondicion);
        result.map((cond: any)=>{
          
          if(cond.Cod_Condicao == this._condicion.sCodCondicion){
            flag = true;
            this._condicion.sDesCondicion = cond.Desc_Condicao;
            this._condicion.bEscalaQtde = cond.Escala_Qtde == 1 ? true : false;
            this._condicion.bNeg = cond.POS_NEG == "N" ? true : false;
            this._condicion.bPos = cond.POS_NEG == "P" ? true : false;
            this._condicion.MANDATORIA = cond.MANDATORIA;
            this._condicion.ESTATISTICA = cond.ESTATISTICA;
            this._camadas.map(elems=>{
              if(elems.id == cond.id_Camada){
                this._condicion.oCamada = elems;
              }
            })
            this._chaveContas.map(elems=>{
              if(elems.id == cond.id_ChaveContas){
                this._condicion.oChaveContas = elems;
              }
            })
            this._tipoValor.map(elems=>{
              if(elems.id == cond.id_TipoValor){
                this._condicion.oTipoValor = elems;
              }
            })
            this._condicion.TIP_BASE_VENDAS = this._condicion.oCamada.TIPO_BASE_VENDAS;
            this.spinner.hide();
          }
        })
        if(!flag){
          this.spinner.hide();
          this._message.errMessage = "A condição não existe";
          this._saveError = true;
          setTimeout(()=>{
            this._saveError = false;
            
          }, 2000)
        }
      })
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
    this.updateMasterData();
  }

  /*
    Iván Lynch 08/03/2020
    Output: Return false if the user clicks on Alterar condiçao
  */
  public isEditMode() {
    $('#myModal').modal('hide')
    this.bCreateMode = false;
    this.updateMasterData();
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
    if(this.selectedProperties.length < 1){
      this.selectedProperties.push(sa);
      this._condicion.aSequencias.push(sa);
    }else{
      if(this.elemExist(sa, this.selectedProperties)){
        this.selectedProperties = this.selectedProperties.filter((obj) => {
          return obj.id !== sa.id
        })
        this._condicion.aSequencias = this._condicion.aSequencias.filter((seq) => {
          return seq.id !== sa.id
        })
      }else{
        this.selectedProperties.push(sa);
        this._condicion.aSequencias.push(sa);
      }
    }
  }

  /*
    Iván Lynch 08/03/2020
    Input: Object
    Output: Uncheck selected object from _sequencias
  */
  public onDltSelection(sel: any){
    this._sequencias.map((elem, index) => {
      if(sel.id == elem.id){
        var selElem = document.getElementById(index.toString());
        selElem.click()
      }
    })
    
  }

  /*
    Iván Lynch 09/03/2020
    Input: null
    Output: null
  */
  public onSubmitCondicao(){
    this._condicionService.postCondicao(this._condicion)
    .then(elem => {
      this._saveSucess = true;
      this._message.sucMessage = "Condição "+ this._condicion.sCodCondicion +" - "+ this._condicion.sDesCondicion +" salva com sucesso!"
      setTimeout(()=>{
        this._saveSucess = false;
        this._condicion = new Condicion();
      }, 2000)
    })
    .catch((error: any) => {
      if(error.error.Cod_Condicao[0] == "condicao with this Cod Condicao already exists."){
        this._message.errMessage = "O código de condição já existe"
        this._saveError = true;
      }
      setTimeout(()=>{
        this._saveError = false;
      }, 2000)
    });
  }


}
