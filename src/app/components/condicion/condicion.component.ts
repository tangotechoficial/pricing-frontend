import { Component, OnInit, Renderer2} from '@angular/core';
import { Sacceso } from '../../models/sacceso';
import { MetadataService } from './../../services/metadata.service';
import { SaccesoService } from '../../services/sacceso.service';
declare var $: any;

@Component({
  selector: 'app-condicion',
  templateUrl: './condicion.component.html',
  styleUrls: ['./condicion.component.scss'],
  providers: [MetadataService, SaccesoService]
})
export class CondicionComponent implements OnInit {

  public _sacceso: Sacceso;
  public sequenciasAcceso: Array<any>;
  public selectedProperties: Array<any>;

  constructor(
    private _metadataService: MetadataService,
    private _saccesoService: SaccesoService,
    private renderer: Renderer2
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

  onClickRemove(){
   this.selectedProperties.splice(this.selectedProperties.findIndex(e => e.tipo === this.selectedProperties[0].tipo),1)
   console.log(this.selectedProperties)
    // this.checkbox = null;
    //this.sequenciasAcceso[0].selected = false;
    this.removeCheckbox();
  }

  removeCheckbox(): void {
    debugger;
    let input = this.renderer.selectRootElement('.sacceso-opcion');
    this.renderer.setProperty(input, 'checked', false); 
    }

}
