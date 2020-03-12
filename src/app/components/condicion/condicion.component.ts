import { Component, OnInit, Renderer2, ElementRef , Input } from '@angular/core';
import { Condicion } from '../../models/condicion';
import { MetadataService } from './../../services/metadata.service';
import { CondicionService } from '../../services/condicion.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Component({
  selector: 'app-condicion',
  templateUrl: './condicion.component.html',
  styleUrls: ['./condicion.component.scss'],
  providers: [MetadataService, CondicionService, NgxSpinnerService]
})
export class CondicionComponent implements OnInit {

  public dbCondition: Array<any>;
  public condicion: Condicion;
  public sequencias: Array<any>;
  public chaveContas: Array<any>;
  public tipoValor: Array<any>;
  public camadas: Array<any>;
  public condicaos: Array<any>;
  public selectedProperties: Array<any>;
  public bCreateMode: boolean;
  public sSeleccionPlaceholder = 'Selecione uma opção';
  public saveSucess: boolean;
  public saveError: boolean;
  public message: any;
  public bpopMenu = false;
  public bSelectCondicao = false;

  constructor(
    private condicionService: CondicionService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    if (window.location.pathname.endsWith('criar')) {
      this.bCreateMode = true;
    } else {
      this.bCreateMode = false;
    }

    this.updateMasterData();

    /* Initialized message local object */
    this.message = {};
    this.message.sCodCondicion = 'CO001';
    this.message.sDesCondicion = 'Condicion 1';
    this.selectedProperties = new Array<any>();
    this.condicion = new Condicion();
    this.condicaos = new Array<any>();

  }

  /*
    Iván Lynch 12/03/2020
    Input: Boolean from child component
    Output: Open search chave de contas popup
  */
  public onSearchChaveContas() {
    this.bpopMenu = true;
  }

  /*
    Iván Lynch 12/03/2020
    Output: Open condicao seleccion popup
  */
  public onSearchCondicao() {
    this.bSelectCondicao = true;
  }

  /*
    Iván Lynch 12/03/2020
    Input: Boolean from child component
    Output: Close condicao popup
  */
  public onCloseCondicaoPopUp(val: any) {
    this.bSelectCondicao = val;
  }

  /*
    Iván Lynch 12/03/2020
    Input: Boolean from child component
    Output: Close chave de contas popup
  */
  onCloseChaveContasPopUp(val: any) {
    this.bpopMenu = val;
  }

  /*
    Iván Lynch 12/03/2020
    Input: Boolean from child component
    Output: Selected condicao object
  */
  public getSelectedCondicao(val: any) {
    this.condicion = val;
    this.updateCondicaoByCode();
  }

  /*
    Iván Lynch 09/03/2020
    Output: Return master values
  */
  public updateMasterData() {
    this.spinner.show();
    this.sequencias = new Array<any>();
    this.tipoValor = new Array<any>();
    this.camadas = new Array<any>();
    this.chaveContas = new Array<any>();
    Promise.all([
      this.condicionService.getSequenciasAcesso().then(result => result.map(sa => this.sequencias.push(sa))),
      this.condicionService.getChaveContas().then(result => result.map(cc => this.chaveContas.push(cc))),
      this.condicionService.getTiposValor().then(result => result.map(tv => this.tipoValor.push(tv))),
      this.condicionService.getCamadas().then(result => result.map(ca => this.camadas.push(ca))),
      this.condicionService.getCondicaos().then(result => result.map(co => this.condicaos.push(co)))
    ]).then(() => {
      this.spinner.hide();
    });
  }
  
  /*
    Iván Lynch 09/03/2020
    Output: Return selected condicao
  */
  public updateCondicaoByCode() {
    this.bSelectCondicao = false;
    this.spinner.show();
    let flag = false;
    this.condicionService.getCondicaoByCode()
      .then((result: any) => {
        console.log(result);
        console.log(this.condicion.sCodCondicion);
        result.map((cond: any) => {
          if (cond.Cod_Condicao === this.condicion.sCodCondicion) {
            flag = true;
            this.condicion.sDesCondicion = cond.Desc_Condicao;
            this.condicion.bEscalaQtde = cond.Escala_Qtde === 1 ? true : false;
            this.condicion.bNeg = cond.POS_NEG === 'N' ? true : false;
            this.condicion.bPos = cond.POS_NEG === 'P' ? true : false;
            this.condicion.MANDATORIA = cond.MANDATORIA;
            this.condicion.ESTATISTICA = cond.ESTATISTICA;
            this.camadas.map(elems => {
              if (elems.id === cond.id_Camada) {
                this.condicion.oCamada = elems;
              }
            });
            this.chaveContas.map(elems => {
              if (elems.id === cond.id_ChaveContas) {
                this.condicion.oChaveContas = elems;
              }
            });
            this.tipoValor.map(elems => {
              if (elems.id === cond.id_TipoValor) {
                this.condicion.oTipoValor = elems;
              }
            });
            this.condicion.TIP_BASE_VENDAS = this.condicion.oCamada.TIPO_BASE_VENDAS;
            this.condicionService.getSequenciasByCondicao()
              .then(elems => {
                elems = elems.filter((obj: any) => {
                  return obj.id_Condicao === cond.id;
                });
                elems.map((seq: any) => {
                  this.sequencias.map((bseq: any, index: any) => {
                    if (seq.id_Sequencia === bseq.id) {
                        const elem = document.getElementById(index.toString());
                        elem.click();
                      }
                  });
                });
                this.spinner.hide();
              });
          }
        });
        if (!flag) {
          this.spinner.hide();
          this.message.errMessage = 'A condição não existe';
          this.saveError = true;
          setTimeout(() => {
            this.saveError = false;
          }, 2000);
        }
      });
  }
  /*
    Iván Lynch 08/03/2020
    Input: Selected Camada Item from dropdown
    Output: Update this._condicao.oCamada
  */
  public getSelectedCamada(val: any) {
    this.condicion.oCamada = val;
  }
  /*
    Iván Lynch 08/03/2020
    Input: Selected Camada Item from dropdown
    Output: Update this._condicao.oCamada
  */
  public getSelectedChaveContas(val: any) {
    console.log(val);
    this.condicion.oChaveContas = val;
    this.bpopMenu = false;
  }
  /*
    Iván Lynch 08/03/2020
    Input: Selected TipoValor Item from dropdown
    Output: Update this._condicao.oTipoValor
  */
  public getSelectedTipoValor(val: any) {
    this.condicion.oTipoValor = val;
  }

  /*
    Iván Lynch 08/03/2020
    Output: Uncheck Pos and Neg checkbox if the other is active
  */
  public checkPosNeg(e: any) {
    const checkPos: any = document.getElementById('checkPositivo');
    const checkNeg: any = document.getElementById('checkNegativo');
    if (e.target.id === 'checkNegativo' && checkPos.checked) {
      checkPos.click();
    }
    if (e.target.id === 'checkPositivo' && checkNeg.checked) {
      checkNeg.click();
    }
  }
  /*
    Iván Lynch 08/03/2020
    Input: Object, Array
    Output: Return true if exists in the array or false if doesn't exist
  */
  public elemExist(obj, list) {
    for (const row of list) {
      if (row === obj) {
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
    if (this.selectedProperties.length < 1) {
      this.selectedProperties.push(sa);
      this.condicion.aSequencias.push(sa);
    } else {
      if (this.elemExist(sa, this.selectedProperties)) {
        this.selectedProperties = this.selectedProperties.filter((obj) => {
          return obj.id !== sa.id;
        });
        this.condicion.aSequencias = this.condicion.aSequencias.filter((seq) => {
          return seq.id !== sa.id;
        });
      } else {
        this.selectedProperties.push(sa);
        this.condicion.aSequencias.push(sa);
      }
    }
  }

  /*
    Iván Lynch 08/03/2020
    Input: Object
    Output: Uncheck selected object from sequencias
  */
  public onDltSelection(sel: any) {
    this.sequencias.map((elem, index) => {
      if (sel.id === elem.id) {
        const selElem = document.getElementById(index.toString());
        selElem.click();
      }
    });
  }
  /*
    Iván Lynch 09/03/2020
    Input: null
    Output: null
  */
  public onSubmitCondicao() {
    this.condicionService.postCondicao(this.condicion)
      .then(elem => {
        this.saveSucess = true;
        this.message.sucMessage = 'Condição ' + this.condicion.sCodCondicion + ' - ' + this.condicion.sDesCondicion + ' salva com sucesso!';
        setTimeout(() => {
          this.saveSucess = false;
          this.condicion = new Condicion();
        }, 2000);
      })
      .catch((error: any) => {
        if (error.error.Cod_Condicao[0] === 'condicao with this Cod Condicao already exists.') {
          this.message.errMessage = 'O código de condição já existe';
          this.saveError = true;
        }
        setTimeout(() => {
          this.saveError = false;
        }, 2000);
      });
  }
}
