import { Component, OnInit } from '@angular/core';
import { SaccesoService } from '../../services/sacceso.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Campo } from 'app/models/campo';
import { Sequencia } from 'app/models/sequencia';
import { timingSafeEqual } from 'crypto';

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
  public isCampoReady = false;

  constructor(
    private saccesoService: SaccesoService,
    private spinner: NgxSpinnerService
  ) { }

  public closePopUp() {
    $('#myModal').modal('hide');
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
  public getLastCampo(sucess?) {
    this.isCampoReady = false;
    this.saccesoService.getLastCampo()
      .then(result => {
        this.newCampo.cod_campo = this.evaluateNextSA(result.cod_campo);
        sucess(true);
        this.isCampoReady = true;
      })
      .catch(() => {
        this.isCampoReady = true;
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
        this.sequencia.cod_sequencia = this.evaluateNextSA(result.cod_sequencia);
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
  public evaluateNextSA(code: string) {
    const codeString = code.substr(0, 2);
    // tslint:disable-next-line: radix
    const codeNumer = parseInt(code.substr(code.length - 2, code.length));
    const nextValue = codeNumer + 1;
    const nextCode = codeString + this.pad_with_zeroes(nextValue, 3);
    return nextCode;
  }

  /* Iván Lynch - 1/4/2020
     Input: Selected Campo
     Output: Unselect Campo from current sequencia
  */
  onDltSelection(campo: Campo) {
    const domElem = document.getElementById(campo.cod_campo);
    domElem.click();
  }

  /* Iván Lynch - 1/4/2020
     Input: Object, List
     Output: Check if current object exists in a list
  */
  public elemExist(obj, list) {
    for (const row of list) {
      if (row === obj) {
        return true;
      }
    }
    return false;
  }

  /* Iván Lynch - 1/4/2020
     Input: Object
     Output: Add object to a campos array in the sequencia
  */
  public checkValue(campo: Campo) {
    let desc = '';
    this.campos.map(elem => {
      if (elem === campo) {
        const domElem: any = document.getElementById(campo.cod_campo);
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
        desc = desc + elem.nome_campo;
        console.log(desc);
      } else {
        desc = desc + '/' + elem.nome_campo;
      }
    });
    this.sequencia.nome_sequencia = desc;
  }

  /* Iván Lynch - 1/4/2020
     Input: Object
     Output: Create campo in /api/seqcampos/
  */
  public submitCampo() {
    this.spinner.show();
    this.saccesoService.postCampo(this.newCampo)
      .then(result => {
        this.saveCampoSuccess = true;
        this.updateCampos();
        setTimeout(() => {
          this.saveCampoSuccess = false;
          this.newCampo = new Campo();
          this.getLastCampo((value) => {
            if (value) {
              this.spinner.hide();
            }
          });
        }, 2000);
      })
      .catch((error: any) => {
        this.saveCampoError = true;
        this.errDesc = 'O nome do campo já existe';
        this.spinner.hide();
        setTimeout(() => {
          this.saveCampoError = false;
        }, 3000);
      });

  }

  /* Iván Lynch - 1/4/2020
     Input: Code
     Output: Add leading zeros to a code
  */
  public pad_with_zeroes(num, length) {
    let myString = '' + num;
    while (myString.length < length) {
      myString = '0' + myString;
    }
    return myString;
  }

  /* Iván Lynch - 1/4/2020
     Input: Sequencia Object
     Output: Create new sequencia
  */
  public submitSA() {
    this.spinner.show();
    this.saccesoService.postSequencia(this.sequencia)
      .then(data => {
        $('#myModal').modal('show');
        this.saveSuccess = true;
        this.campos.map(elem => {
          const domElem: any = document.getElementById(elem.cod_campo);
          domElem.checked = false;
        });
        this.spinner.hide();
        setTimeout(function () {
          this.saveSuccess = false;
          this.sequencia = new Sequencia();
          this.getLastSequencia();
        }.bind(this), 2000);

      })
      .catch((errr: any) => {
        this.saveError = true;
        this.errDesc = 'A sequência de acesso já existe';
        this.spinner.hide();
        setTimeout(function () {
          this.saveError = false;
        }.bind(this), 2000);
      });
  }
}
