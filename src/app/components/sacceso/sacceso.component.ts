import { Component, OnInit } from '@angular/core';
import { Sacceso } from '../../models/sacceso';
import { MetadataService } from './../../services/metadata.service';
import { SaccesoService } from '../../services/sacceso.service';
import { fromEvent } from 'rxjs';
import { tap, switchMap } from "rxjs/operators";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



declare var $: any;

@Component({
  selector: 'sacceso',
  templateUrl: './sacceso.component.html',
  styleUrls: ['./sacceso.component.scss'],
  providers: [MetadataService, SaccesoService]
})

export class SaccesoComponent implements OnInit {
  searchSeq;
  searchSeqInput;
  searchSeleccionado;
  selectedValue: string;
  public existSelected = false;
  public _sacceso: Sacceso;
  public _saMessage: Sacceso;
  public _newSA: Sacceso;
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
    private _saccesoService: SaccesoService
  ) { }

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
    this._saccesoService.getSaccesoList().subscribe((values) => {
      values.map((elem) => {
        let seq = new Sacceso();
        seq.setCodigo(elem.SEQCODE);
        seq.setDescription(elem.SEQDESC);
        this.sequenciasAccesoSearch.push(seq);
        this.sequenciasAcceso.push(seq);
      });
    });

    $('div[contenteditable]').keydown(function (e) {
      // trap the return key being pressed
      if (e.keyCode === 13) {
        // insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
        document.execCommand('insertHTML', false, '<br>');
        // prevent the default behaviour of return key pressed
        return false;
      }
    });
  }



  public onBlurSQSearch() {
    this.searchValues = new Array<any>();
  }

  public onSelectedValue(event) {
    this.selectedValue = event;
    this._sacceso = event;
    this.existSelected = true;
    setTimeout(function () {
      this.existSelected = false;
    }.bind(this), 3000)
  }

  ngAfterViewInit() {

    const input: any = document.getElementById('SQSearch');
    const selectedElements: any = document.getElementById('saSearch1');
    const selectedElements2: any = document.getElementById('saSearch2');

    const search$ = fromEvent(input, 'keyup')
      .pipe(
        tap(() => this.searchValues = []),
        switchMap(() => this._metadataService.searchData(input.value))
      )
    search$.subscribe(
      (values) => {
        this.searchValues.push(values);
      }
    );

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
      }
    })

    var elem = document.getElementById(selectedIndex);
    elem.click()
  }

  public checkValue(sa: Sacceso) {
    this.sequenciasAcceso.map(elem => {
      if (elem.getCodigo() == sa.getCodigo()) {
        if (elem.isSelected()) {
          elem.setSelected(false);
          this.selectedProperties.map((elem2, index) => {
            if (elem2.getCodigo() == sa.getCodigo()) {
              this.selectedProperties.splice(index, 1);
            }
          })
        } else {
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
      },
        error => {
          this.saveError = true;
          setTimeout(function () {
            this.saveError = false;
          }.bind(this), 2000)
        })

    this._saMessage.setCodigo(this._newSA.getCodigo());
    this._saMessage.setDescription(this._newSA.getDescription());

    setTimeout(function () {
      this.saveSuccess = false;
    }.bind(this), 2000)
    this.sequenciasAcceso.push(this._newSA);
    this._newSA = new Sacceso();
  }

  public submitSA() {
    this._saccesoService.postSacceso(this._sacceso)
      .subscribe(response => {
        this._saMessage.setCodigo(this._sacceso.getCodigo());
        this._saMessage.setDescription(this._sacceso.getDescription());
        this.saveSuccess = true;
        setTimeout(function () {
          this.saveSuccess = false;
        }.bind(this), 2000)
      },
        error => {
          this.saveError = true;
          setTimeout(function () {
            this.saveError = false;
          }.bind(this), 2000)
        })
    
  }



}