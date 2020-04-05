import { Component, OnInit, Renderer2, ElementRef, Input } from '@angular/core';
import { Condicion } from '../../models/condicion';
import { MetadataService } from './../../services/metadata.service';
import { CondicionService } from '../../services/condicion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Sequencia } from 'app/models/sequencia';
import { Condicao } from 'app/models/condicao';
import { TipoValor } from 'app/models/tipovalor';
import { Camada } from 'app/models/camadas';
import { ChaveContas } from 'app/models/chavecontas';

declare var $: any;

@Component({
  selector: 'app-condicion',
  templateUrl: './condicion.component.html',
  styleUrls: ['./condicion.component.scss'],
  providers: [MetadataService, CondicionService, NgxSpinnerService]
})
export class CondicionComponent implements OnInit {
  public searchSeleccionado;
  public dbCondition: Array<any>;
  public condicion: Condicao;
  public sequencias: Array<Sequencia>;
  public chaveContas: Array<ChaveContas>;
  public tipoValor: Array<TipoValor>;
  public camadas: Array<Camada>;
  public condicaos: Array<Condicao>;
  public selectedProperties: Array<any>;
  public bCreateMode: boolean;
  public sSeleccionCamadaPlaceholder = 'Selecione uma camada';
  public sSeleccionPlaceholder = 'Selecione uma opção';
  public saveSucess: boolean;
  public saveError: boolean;
  public message: any;
  public bpopMenu = false;
  public bSelectCondicao = false;

  constructor(
    public condicionService: CondicionService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    /* Initialized message local object */
    this.message = {};
    this.selectedProperties = new Array<any>();
    this.condicion = new Condicao();

    if (window.location.pathname.endsWith('criar')) {
      this.bCreateMode = true;
      this.getLastCondicao();
    } else {
      this.bCreateMode = false;
    }

    this.updateMasterData();

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
    const checkPos: any = document.getElementById('checkPositivo');
    const checkNeg: any = document.getElementById('checkNegativo');
    if (val.sequencias) {
      val.sequencias.map(elem => {
        const domElem = document.getElementById(elem.cod_sequencia);
        domElem.click();
      });
    }
    this.condicion.cod_condicao = val.cod_condicao;
    this.condicion.desc_condicao = val.desc_condicao;
    this.condicion.escala_qtde = val.escala_qtde;
    this.condicion.pos_neg = val.pos_neg;
    this.condicion.tip_base_vendas = val.tip_base_vendas;
    this.condicion.mandatoria = val.mandatoria;
    this.condicion.estatistica = val.estatistica;
    this.camadas.map(elem => {
      if (elem.cod_camada === val.cod_camada) {
        this.condicion.camada = elem;
      }
    });

    if (this.condicion.pos_neg === 'P') {
      checkPos.checked = true;
      checkNeg.checked = false;
    } else {
      checkPos.checked = false;
      checkNeg.checked = true;
    }

    this.chaveContas.map(elem => {
      if (elem.cod_chavecontas === val.cod_chavecontas) {
        this.condicion.chavecontas = elem;
      }
    });
    this.tipoValor.map(elem => {
      if (elem.cod_tipovalor === val.cod_tipovalor) {
        this.condicion.tipovalor = elem;
      }
    });
  }

  /*
    Iván Lynch 09/03/2020
    Output: Return master values
  */
  public updateMasterData() {
    this.spinner.show();
    this.sequencias = new Array<Sequencia>();
    this.condicaos = new Array<Condicao>();
    this.tipoValor = new Array<TipoValor>();
    this.camadas = new Array<Camada>();
    this.chaveContas = new Array<ChaveContas>();
    this.selectedProperties = new Array<any>();
    Promise.all([
      this.condicionService.getSequenciasAcesso().then(result => this.sequencias = result),
      this.condicionService.getChaveContas().then(result => this.chaveContas = result),
      this.condicionService.getTiposValor().then(result => this.tipoValor = result),
      this.condicionService.getCamadas().then(result => this.camadas = result),
      this.condicionService.getCondicaos().then(result => this.condicaos = result)
    ]).then(() => {
      this.spinner.hide();
    });
  }

  /*
    Iván Lynch 09/03/2020
    Output: Return selected condicao
  */
  public updateCondicaoByCode() {
    this.selectedProperties.map(elem => {
      /* this.sequencias.map((seq: Sequencia, index) => {
        if (seq.cod_sequencia === elem.cod_sequencia) {
          const domElem = document.getElementById(index.toString());
          domElem.click();
        }
      }); */
    });
  }
  /*
    Iván Lynch 08/03/2020
    Input: Selected Camada Item from dropdown
    Output: Update this._condicao.oCamada
  */
  public getSelectedCamada(camada: Camada) {
    this.condicion.camada = camada;
    this.condicion.tip_base_vendas = camada.tipo_base_vendas;
  }
  /*
    Iván Lynch 08/03/2020
    Input: Selected Camada Item from dropdown
    Output: Update this._condicao.oCamada
  */
  public getSelectedChaveContas(val: ChaveContas) {
    this.condicion.chavecontas = val;
    this.bpopMenu = false;
  }
  /*
    Iván Lynch 08/03/2020
    Input: Selected TipoValor Item from dropdown
    Output: Update this._condicao.oTipoValor
  */
  public getSelectedTipoValor(val: TipoValor) {
    this.condicion.tipovalor = val;
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
      this.condicion.pos_neg = 'N';
    }

    if (e.target.id === 'checkPositivo' && checkNeg.checked) {
      checkNeg.click();
      this.condicion.pos_neg = 'P';
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
  public checkValue(sequencia: Sequencia) {
    this.sequencias.map(elem => {
      if (elem === sequencia) {
        const domElem: any = document.getElementById(sequencia.cod_sequencia);
        if (this.elemExist(sequencia, this.condicion.sequencias)) {
          domElem.checked = false;
          this.condicion.sequencias = this.condicion.sequencias.filter((obj) => {
            return obj !== sequencia;
          });
        } else {
          this.condicion.sequencias.push(sequencia);
        }
      }
    });
  }

  /*
    Iván Lynch 08/03/2020
    Input: Object
    Output: Uncheck selected object from sequencias
  */
  public onDltSelection(sequencia: Sequencia) {
    const domElem = document.getElementById(sequencia.cod_sequencia);
    domElem.click();
  }

  /*
    Iván Lynch 12/03/2020
    Input: null
    Output: Create new Condicao
  */
  async postCondicao(callback) {
    this.spinner.show();
    this.condicionService.postCondicao(this.condicion)
      .then(result => {
        this.sequencias.map( elem => {
          const domElem: any = document.getElementById(elem.cod_sequencia);
          domElem.checked = false;
        });
        this.saveSucess = true;
        setTimeout(() => {
          this.saveSucess = false;
          this.condicion = new Condicao();
          this.spinner.hide();
          callback(true);
        }, 2000);
      });
  }


  /*
    Iván Lynch 12/03/2020
    Input: null
    Output: Edit Condicao
  */
  public putCondicao(callback) {
    this.spinner.show();
    this.condicionService.putCondicao(this.condicion)
      .then(result => {
        this.saveSucess = true;
        this.sequencias.map( elem => {
          const domElem: any = document.getElementById(elem.cod_sequencia);
          domElem.checked = false;
        });
        setTimeout(() => {
          this.saveSucess = false;
          this.condicion = new Condicao();
          callback(true);
        }, 1000);
      });
  }

  /*
    Iván Lynch 12/03/2020
    Input: null
    Output: null
  */
  onSubmitCondicao() {
    if (this.bCreateMode) {
      this.postCondicao((val: boolean) => {

      });
    } else {
      this.putCondicao((val: boolean) => {
        if (val) {
          this.updateMasterData();
        }
      });
    }
  }

  /* Iván Lynch - 12/03/2020
     Input: String Code
     Output: String Code + 1
     ie:
        Input: CP001
        Output: CP002
  */
  public getLastCondicao() {
    this.condicionService.getLastCondicao()
      .then((result: any) => {
        this.condicion.cod_condicao = this.evaluateNextSA(result.cod_condicao);
      });
  }

  /* Iván Lynch - 12/03/2020
     Input: String Code
     Output: String Code + 1
     ie:
        Input: CP001
        Output: CP002
  */
  public evaluateNextSA(code: any) {
    const codeString = code.substr(0, 2);
    // tslint:disable-next-line: radix
    const codeNumer = parseInt(code.substr(code.length - 2, code.length));
    const nextValue = codeNumer + 1;
    const nextCode = 'CO' + this.pad_with_zeroes(nextValue, 3);
    return nextCode;
  }

  /* Iván Lynch - 12/03/2020
     Input: String Code
     Output: String Code + 1
     ie:
        Input: CP001
        Output: CP002
  */
  public pad_with_zeroes(num, length) {
    let myString = '' + num;
    while (myString.length < length) {
      myString = '0' + myString;
    }
    return myString;
  }
}
