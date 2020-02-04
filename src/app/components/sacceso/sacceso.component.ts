import { Component, OnInit } from '@angular/core';
import { Sacceso } from '../../models/sacceso';
import { MetadataService } from './../../services/metadata.service';
import { SaccesoService } from 'src/app/services/sacceso.service';
declare var $: any;

@Component({
  selector: 'sacceso',
  templateUrl: './sacceso.component.html',
  styleUrls: ['./sacceso.component.css'],
  providers: [MetadataService, SaccesoService]
})
export class SaccesoComponent implements OnInit {

  public _sacceso: Sacceso;
  public sequenciasAcceso: Array<any>;
  public selectedProperties: Array<any>;

  constructor(
    private _metadataService: MetadataService,
    private _saccesoService: SaccesoService
  ) { }

  ngOnInit() {
    this.sequenciasAcceso = new Array<any>();
    this.selectedProperties = new Array<any>();
    this._sacceso = new Sacceso();
    this._metadataService.getMetadata().map(elem => {
      var elemModel = {
        'tipo': elem,
        'selected': false
      }
      this.sequenciasAcceso.push(elemModel);
    })
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