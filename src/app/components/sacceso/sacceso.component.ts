import { Component, OnInit } from '@angular/core';
import { Sacceso } from '../../models/sacceso';
import { MetadataService } from './../../services/metadata.service';
import { SaccesoService } from '../../services/sacceso.service';
import { NgxSpinnerService } from "ngx-spinner";

declare var $: any;

@Component({
  selector: 'sacceso',
  templateUrl: './sacceso.component.html',
  styleUrls: ['./sacceso.component.scss'],
  providers: [MetadataService, SaccesoService, NgxSpinnerService]
})

export class SaccesoComponent implements OnInit {
  searchSeq;
  searchSeqInput;
  searchSeleccionado;
  selectedValue: string;
  public existSelected = false;
  public errDesc = "";
  public _sacceso: Sacceso;
  public _saMessage: Sacceso;
  public _newSA: Sacceso;
  public _nextVal: string;
  public sequenciasAcceso: Array<any>;
  public sequenciasAccesoSearch: Array<any>;
  public selectedProperties: Array<any>;
  public searchValues: Array<any>;
  public selValues1: Array<any>;
  public selValues2: Array<any>;
  public saveSuccess: boolean = false;
  public saveError: boolean = false;
  public inputDescripcion: string;


  constructor(
    private _metadataService: MetadataService,
    private _saccesoService: SaccesoService,
    private spinner: NgxSpinnerService
  ) { }

  public closePopUp() {
    $('#myModal').modal('hide')
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
    this._sacceso = new Sacceso();
    this._newSA = new Sacceso();
    this._saMessage = new Sacceso();

    //Update SeqCampo elements
    this.updateSeqCampo()

    //Updates the _newSA with the last Cod_Campo
    this.getLastSeqCampo()

    //Updates the _sacceso with the last Cod_Sequencia
    this.getLastSequencia()

    $('div[contenteditable]').keydown(function (e) {
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
    //Get values from SeqCampo
    this.sequenciasAcceso = new Array<any>();
    this._saccesoService.getSaccesoList().subscribe((values) => {
      values.map((elem) => {
        let seq = new Sacceso();
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
     This function updates the _newSA Object
  */
  public getLastSeqCampo() {
    this._saccesoService.getLastSeqCampo().subscribe((value) => {
      var parsedValue;
      parsedValue = value;
      var oldCode = parsedValue.Cod_Campo;
      this._newSA.setCodigo(this.evaluateNextSA(oldCode));
    });
  }

  /* Iván Lynch - 06/03/2020 
     Input: null 
     Output: null
     This function updates the _sacceso Object
  */
  public getLastSequencia() {
    this.spinner.show();
    this._saccesoService.getLastSequencia()
      .then((result: any) => {
        this._sacceso.setCodigo(this.evaluateNextSA(result.Cod_Sequencia))
        this.spinner.hide()
      })
  }

  /* Iván Lynch - 05/03/2020 
     Input: String Code 
     Output: String Code + 1 
     ie: 
        Input: CP001
        Output: CP002 
  */
  public evaluateNextSA(code: String) {
    let codeString = code.substr(0, 2);
    let codeNumer = parseInt(code.substr(code.length - 2, code.length));
    let nextValue = codeNumer + 1;
    let nextCode = codeString + this.pad_with_zeroes(nextValue, 3);
    return nextCode;
  }

  public onSelectedValue(event) {
    this.selectedValue = event;
    this._sacceso = event;
    this.existSelected = true;
    setTimeout(function () {
      this.existSelected = false;
    }.bind(this), 3000)
  }

  onDltSelection(val) {
    var selectedIndex = '';
    this.selectedProperties.forEach((elem, index) => {
      if (elem.getCodigo() == val.getCodigo()) {
        this.sequenciasAcceso.forEach((sElem, index2) => {
          if (sElem.getCodigo() == val.getCodigo()) {
            selectedIndex = index2.toString();
          }
        })
        this.selectedProperties.splice(index, 1);
        this._sacceso._parents.slice(index, 1);
      }
    })

    const elements = document.getElementsByClassName("custom-control-input");
    const aElems = Array.prototype.slice.call(elements)
    for (var i = 0; i < aElems.length; i++) {
      const elemLabels = aElems[i].labels

      if (elemLabels[0].innerText === val.getDescription()) {
        aElems[i].click();
      }
    }
  }

  public checkValue(sa: Sacceso) {
    this.sequenciasAcceso.map(elem => {
      if (elem.getCodigo() == sa.getCodigo()) {
        if (elem.isSelected()) {
          elem.setSelected(false);
          this.selectedProperties.map((elem2, index) => {
            if (elem2.getCodigo() == sa.getCodigo()) {
              this.selectedProperties.splice(index, 1);
              let array = this._sacceso._parents.filter((obj) => {
                return obj.getCodigo() !== sa.getCodigo()
              })
              console.log(array);
            }
          })
        } else {
          this._sacceso._parents.push(sa);
          console.log(this._sacceso._parents);
          elem.setSelected(true);
          this.selectedProperties.push(elem);
        }
      }
    })

    var descripcion = '';
    this.selectedProperties.forEach((elem, index) => {
      if (index == 0) {
        descripcion = descripcion + elem.getDescription();
      } else {
        descripcion = descripcion + '/' + elem.getDescription();
      }
    })
    this._sacceso.sDesAcceso = descripcion;
  }

  submitNewSA() {
    this._saccesoService.postSacceso(this._newSA)
      .subscribe(response => {
        this.saveSuccess = true;
        this.updateSeqCampo();
      },
        error => {
          console.log(error.error.Nome_Campo[0] == "se q_campo with this Nome Campo already exists.");
          this.errDesc = "O campo já existe"
          this.saveError = true;
          setTimeout(function () {
            this.saveError = false;
          }.bind(this), 2000)
        })

    this._saMessage.setCodigo(this._newSA.getCodigo());
    this._saMessage.setDescription(this._newSA.getDescription());

    setTimeout(function () {
      this.saveSuccess = false;
      this.getLastSeqCampo();
    }.bind(this), 2000)
    this._newSA = new Sacceso();

  }

  public pad_with_zeroes(number, length) {

    var my_string = '' + number;
    while (my_string.length < length) {
      my_string = '0' + my_string;
    }

    return my_string;

  }

  public submitSA() {
    console.log(this._sacceso)
    this.spinner.show();
    if (this._sacceso._parents.length < 2) {
      
      this.errDesc = "Selecione mais de um campo"
      this.saveError = true;
      this.spinner.hide()
      setTimeout(function () {
        this.saveError = false;
      }.bind(this), 2000)

    } else {
      this._saccesoService.postSaccesoComp(this._sacceso)
        .then(data => {
          this.saveSuccess = true;
          $('#myModal').modal('show');
          this.spinner.hide()
          this.getLastSequencia();
          setTimeout(function () {
            this.saveSuccess = false;
          }.bind(this), 2000)
          this._saMessage.setCodigo(this._sacceso.getCodigo());
          this._saMessage.setDescription(this._sacceso.getDescription());
          this._sacceso = new Sacceso();
          this.selectedProperties.map(elem => {
            this.onDltSelection(elem);
          })
          this.selectedProperties.forEach(elem => {
            this.onDltSelection(elem);
          })
          this.selectedProperties.map(elem => {
            this.onDltSelection(elem);
          })
          this.selectedProperties.map(elem => {
            this.onDltSelection(elem);
          })
        })
        .catch((err) => {
          console.log(err)
          if (err.error.Nome_Sequencia[0] == "sequencia with this Nome Sequencia already exists.") {
            this.errDesc = "A sequência de acesso já existe."
            this.saveError = true;
            this.spinner.hide()
            setTimeout(function () {
              this.saveError = false;
            }.bind(this), 2000)
          }
        })
    }

    /* this._saccesoService.postSaccesoComp(this._sacceso)
      .subscribe((response: any) => {
        this.saveSuccess = true;
        $('#myModal').modal('show');
        this.getLastSequencia();
      },
      error => {
        console.log(error.error.Nome_Sequencia[0] == "sequencia with this Nome Sequencia already exists.");
        this.errDesc = "A sequência de acesso já existe."
        this.saveError = true;
        setTimeout(function () {
          this.saveError = false;
        }.bind(this), 2000)
      }) */


  }

}