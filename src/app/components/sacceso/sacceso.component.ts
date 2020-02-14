import { Component, OnInit } from '@angular/core';
import { Sacceso } from '../../models/sacceso';
import { MetadataService } from './../../services/metadata.service';
import { SaccesoService } from '../../services/sacceso.service';
import { fromEvent } from 'rxjs';
import { tap, switchMap } from "rxjs/operators";



declare var $: any;

@Component({
  selector: 'sacceso',
  templateUrl: './sacceso.component.html',
  styleUrls: ['./sacceso.component.scss'],
  providers: [MetadataService, SaccesoService]
})

export class SaccesoComponent implements OnInit {
  public _sacceso: Sacceso;
  public sequenciasAcceso: Array<any>;
  public selectedProperties: Array<any>;
  public searchValues: Array<any>;

  constructor(
    private _metadataService: MetadataService,
    private _saccesoService: SaccesoService
  ) { }

  ngOnInit() {
    this.sequenciasAcceso = new Array<any>();
    this.selectedProperties = new Array<any>();
    this.searchValues = new Array<any>();
    this._sacceso = new Sacceso();
    this._metadataService.getMetadataSeqAcceso().map(elem => {
      var elemModel = {
        'tipo': elem,
        'selected': false
      }
      this.sequenciasAcceso.push(elemModel);
    })
  }

  onBlurSQSearch(){
    this.searchValues = new Array<any>();
  }

  public onSelectedValue(event, value){
    console.log(event);
  }

  ngAfterViewInit(){ 

    const input:any = document.getElementById('SQSearch');
    console.log(input);

    const search$ = fromEvent(input, 'keyup')
      .pipe(
        tap(()=> this.searchValues = []),
        switchMap(()=> this._metadataService.searchData(input.value))
      )
    search$.subscribe(
      (values) => {
        this.searchValues.push(values);
      }
    );
    
  }

  onDltSelection(val){
    var selectedIndex = '';
    this.selectedProperties.forEach((elem, index) => {
      if(elem.tipo == val.tipo){
        this.sequenciasAcceso.forEach((sElem, index2) => {
          if(sElem.tipo == val.tipo){
            selectedIndex = index2.toString();
          }
        })
        this.selectedProperties.splice(index, 1);
      }
    })

    var elem = document.getElementById(selectedIndex);
    elem.click()
  }

  public checkValue(tipo){

    this.sequenciasAcceso.map(elem => {
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

    this._sacceso.sDesAcceso = descripcion;
  }

  public submitSA(){
    this._saccesoService.postSacceso(this._sacceso)
      .subscribe(response => {
        console.log(response);
      },
      error => {
        console.log(error);
      })
  }

}