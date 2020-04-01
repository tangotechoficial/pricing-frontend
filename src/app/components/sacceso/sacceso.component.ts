import { Component, OnInit } from '@angular/core';
import { Sacceso } from '../../models/sacceso';
import { MetadataService } from './../../services/metadata.service';
import { SaccesoService } from '../../services/sacceso.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Campo } from 'app/models/campo';
import { Sequencia } from 'app/models/sequencia';

declare var $: any;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'sacceso',
  templateUrl: './sacceso.component.html',
  styleUrls: ['./sacceso.component.scss'],
  providers: [SaccesoService, NgxSpinnerService]
})

export class SaccesoComponent implements OnInit {
  searchSeq;
  searchSeqInput;
  searchSeleccionado;
  selectedValue: string;
  public existSelected = false;
  public errDesc = '';
  public nextVal: string;
  public sequenciasAccesoSearch: Array<any>;
  public selectedProperties: Array<any>;
  public searchValues: Array<any>;
  public selValues1: Array<any>;
  public selValues2: Array<any>;
  public saveSuccess = false;
  public saveCampoSuccess = false;
  public saveCampoError = false;
  public inputDescripcion: string;
  public campos: Array<Campo>;
  public newCampo: Campo;
  public saveError: boolean;
  public sequencia: Sequencia;


  constructor(
    private saccesoService: SaccesoService,
    private spinner: NgxSpinnerService
  ) { }

  public closePopUp() {
    $('#myModal').modal('hide');
  }

  public openPop() {

  }

  ngOnInit() {
    this.newCampo = new Campo();
    this.campos = new Array<Campo>();
    this.sequencia = new Sequencia();
    this.sequenciasAccesoSearch = new Array<any>();
    this.searchValues = new Array<any>();
    this.selValues1 = new Array<any>();
    this.selValues2 = new Array<any>();

    // Update campos
    this.updateCampos();

    // Updates Campo with the last Cod_Campo
    this.getLastCampo();

    // Update Sequencia with the last Cod_Sequencia
    this.getLastSequencia();
  }

  public updateCampos() {
    Promise.all([
      this.saccesoService.getCampos()
        .then(campos => this.campos = campos)
    ]);
  }

  /* Iván Lynch - 06/03/2020
     Input: null
     Output: null
     This function updates the newSA Object
  */
  public getLastCampo() {
    this.saccesoService.getLastCampo()
      .then(result => {
        this.newCampo.Cod_Campo = this.evaluateNextSA(result.Cod_Campo);
      });
  }

  /* Iván Lynch - 06/03/2020
     Input: null
     Output: null
     This function updates the sacceso Object
  */
  public getLastSequencia() {
    this.spinner.show();
    this.saccesoService.getLastSequencia()
      .then((result: any) => {
        this.sequencia.Cod_Sequencia = this.evaluateNextSA(result.Cod_Sequencia);
        this.spinner.hide();
      });
  }

  /* Iván Lynch - 05/03/2020
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
    const nextCode = codeString + this.pad_with_zeroes(nextValue, 3);
    return nextCode;
  }

  onDltSelection(campo: Campo) {
    const domElem = document.getElementById(campo.Cod_Campo);
    domElem.click();
  }

  public elemExist(obj, list) {
    for (const row of list) {
      if (row === obj) {
        return true;
      }
    }
    return false;
  }

  public checkValue(campo: Campo) {
    let desc = '';
    this.campos.map(elem => {
      if (elem === campo) {
        const domElem: any = document.getElementById(campo.Cod_Campo);
        if (this.elemExist(campo, this.sequencia.campos)) {
          domElem.checked = false;
          this.sequencia.campos = this.sequencia.campos.filter((obj) => {
            return obj !== campo;
          });
        } else {
          this.sequencia.campos.push(campo);
        }
      }
    });

    this.sequencia.campos.map((elem: Campo, index: any) => {
      if (index === 0) {
        desc = desc + elem.Nome_Campo;
        console.log(desc);
      } else {
        desc = desc + '/' + elem.Nome_Campo;
      }
    });
    this.sequencia.Nome_Sequencia = desc;
  }

  public submitCampo() {
    this.spinner.show();
    this.getLastCampo();
    this.saccesoService.postCampo(this.newCampo)
      .then(result => {
        this.saveCampoSuccess = true;
        this.updateCampos();
        this.spinner.hide();
        setTimeout(() => {
          this.saveCampoSuccess = false;
        }, 3000);
      });
  }

  public pad_with_zeroes(num, length) {
    let myString = '' + num;
    while (myString.length < length) {
      myString = '0' + myString;
    }
    return myString;
  }

  public submitSA() {
    this.spinner.show();
    this.saccesoService.postSequencia(this.sequencia)
      .then(data => {
        this.saveSuccess = true;
        this.campos.map( elem => {
          const domElem: any = document.getElementById(elem.Cod_Campo);
          domElem.checked = false;
        });
        $('#myModal').modal('show');
        this.spinner.hide();
        this.getLastSequencia();
        setTimeout(function() {
          this.saveSuccess = false;
        }.bind(this), 2000);
        this.sequencia = new Sequencia();
      });
  }
}
