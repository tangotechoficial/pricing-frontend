import { Component, OnInit } from '@angular/core';
import { Sacceso } from '../../models/sacceso';
import { MetadataService } from './../../services/metadata.service';
import { SaccesoService } from '../../services/sacceso.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  public sacceso: Sacceso;
  public saMessage: Sacceso;
  public newSA: Sacceso;
  public nextVal: string;
  public sequenciasAcceso: Array<any>;
  public sequenciasAccesoSearch: Array<any>;
  public selectedProperties: Array<any>;
  public searchValues: Array<any>;
  public selValues1: Array<any>;
  public selValues2: Array<any>;
  public saveSuccess = false;
  public saveError = false;
  public inputDescripcion: string;


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

    this.sequenciasAcceso = new Array<any>();
    this.sequenciasAccesoSearch = new Array<any>();
    this.selectedProperties = new Array<any>();
    this.searchValues = new Array<any>();
    this.selValues1 = new Array<any>();
    this.selValues2 = new Array<any>();
    this.sacceso = new Sacceso();
    this.newSA = new Sacceso();
    this.saMessage = new Sacceso();

    // Update SeqCampo elements
    this.updateSeqCampo();

    // Updates the newSA with the last Cod_Campo
    this.getLastSeqCampo();

    // Updates the sacceso with the last Cod_Sequencia
    this.getLastSequencia();

    $('div[contenteditable]').keydown((e: any) => {
      if (e.keyCode === 13) {
        document.execCommand('insertHTML', false, '<br>');
        return false;
      }
    });
  }


  /* Iván Lynch - 06/03/2020
     Input: null
     Output: null
     This function updates the SeqCampo elements
  */
  public updateSeqCampo() {
    // Get values from SeqCampo
    this.sequenciasAcceso = new Array<any>();
    this.saccesoService.getSaccesoList().subscribe((values) => {
      values.map((elem) => {
        const seq = new Sacceso();
        seq.setId(elem.id);
        seq.setCodigo(elem.Cod_Campo);
        seq.setDescription(elem.Nome_Campo);
        this.sequenciasAccesoSearch.push(seq);
        this.sequenciasAcceso.push(seq);
      });
    });
  }

  /* Iván Lynch - 06/03/2020
     Input: null
     Output: null
     This function updates the newSA Object
  */
  public getLastSeqCampo() {
    this.saccesoService.getLastSeqCampo().subscribe((value: any) => {
      const oldCode = value.Cod_Campo;
      this.newSA.setCodigo(this.evaluateNextSA(oldCode));
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
        this.sacceso.setCodigo(this.evaluateNextSA(result.Cod_Sequencia));
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

  public onSelectedValue(event) {
    this.selectedValue = event;
    this.sacceso = event;
    this.existSelected = true;
    setTimeout(function() {
      this.existSelected = false;
    }.bind(this), 3000);
  }

  onDltSelection(val) {
    let selectedIndex = '';
    this.selectedProperties.forEach((elem, index) => {
      if (elem.getCodigo() === val.getCodigo()) {
        this.sequenciasAcceso.forEach((sElem, index2) => {
          if (sElem.getCodigo() === val.getCodigo()) {
            selectedIndex = index2.toString();
          }
        });
        this.selectedProperties.splice(index, 1);
        this.sacceso._parents.slice(index, 1);
      }
    });

    const elements = document.getElementsByClassName('custom-control-input');
    const aElems = Array.prototype.slice.call(elements);
    aElems.forEach((elem: any, index: any) => {
      const elemLabel = elem.labels;
      if (elemLabel[0].innerText === val.getDescription()) {
        aElems[index].click();
      }
    });
  }

  public checkValue(sa: Sacceso) {
    // Iterate over SEQ_CAMPOS
    this.sequenciasAcceso.map(elem => {

      // If selected elemement sa is equal to current element in the array loop
      if (elem.getId() === sa.getId()) {

        // Check if current element is already selected
        if (elem.isSelected()) {

          // Unselect current element
          elem.setSelected(false);

          // Iterate over selected properties to remove current selected item
          this.selectedProperties.map((elem2, index) => {

            // If current selected item exist on the the array
            if (elem2.getId() === elem.getId()) {
              // Remove elem from array
              this.selectedProperties.splice(index, 1);
              this.sacceso._parents = this.sacceso._parents.filter((obj) => {
                return obj.getCodigo() !== sa.getCodigo();
              });
            }
          });
        } else {
          this.sacceso._parents.push(sa);
          console.log(this.sacceso._parents);
          elem.setSelected(true);
          this.selectedProperties.push(elem);
        }
      }
    });

    let descripcion = '';
    this.selectedProperties.forEach((elem, index) => {
      if (index === 0) {
        descripcion = descripcion + elem.getDescription();
      } else {
        descripcion = descripcion + '/' + elem.getDescription();
      }
    });
    this.sacceso.sDesAcceso = descripcion;
  }

  submitNewSA() {
    this.saccesoService.postSacceso(this.newSA)
      .subscribe(response => {
        this.saveSuccess = true;
        this.updateSeqCampo();
      },
        error => {
          console.log(error.error.Nome_Campo[0] === 'se q_campo with this Nome Campo already exists.');
          this.errDesc = 'O campo já existe';
          this.saveError = true;
          setTimeout(function() {
            this.saveError = false;
          }.bind(this), 2000);
        });

    this.saMessage.setCodigo(this.newSA.getCodigo());
    this.saMessage.setDescription(this.newSA.getDescription());

    setTimeout(function() {
      this.saveSuccess = false;
      this.getLastSeqCampo();
    }.bind(this), 2000);
    this.newSA = new Sacceso();

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
    this.saccesoService.postSaccesoComp(this.sacceso)
      .then(data => {
        this.saveSuccess = true;
        $('#myModal').modal('show');
        this.spinner.hide();
        this.getLastSequencia();
        setTimeout(function() {
          this.saveSuccess = false;
        }.bind(this), 2000);
        this.saMessage.setCodigo(this.sacceso.getCodigo());
        this.saMessage.setDescription(this.sacceso.getDescription());
        this.sacceso = new Sacceso();
        this.selectedProperties.map(elem => {
          this.onDltSelection(elem);
        });
        this.selectedProperties.forEach(elem => {
          this.onDltSelection(elem);
        });
        this.selectedProperties.map(elem => {
          this.onDltSelection(elem);
        });
        this.selectedProperties.map(elem => {
          this.onDltSelection(elem);
        });
      })
      .catch((err) => {
        if (err.error.Nome_Sequencia[0] === 'sequencia with this Nome Sequencia already exists.') {
          this.errDesc = 'A sequência de acesso já existe.';
          this.saveError = true;
          this.spinner.hide();
          setTimeout(function() {
            this.saveError = false;
          }.bind(this), 2000);
        }
      });
  }
}
