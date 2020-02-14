import { Component, OnInit, Renderer2} from '@angular/core';
import { Condicion } from '../../models/condicion';
import { MetadataService } from './../../services/metadata.service';
import { CondicionService } from '../../services/condicion.service';
declare var $: any;

@Component({
  selector: 'app-condicion',
  templateUrl: './condicion.component.html',
  styleUrls: ['./condicion.component.scss'],
  providers: [MetadataService, CondicionService]
})
export class CondicionComponent implements OnInit {

  public _condicion: Condicion;
  public listaCondiciones: Array<any>;
  public selectedProperties: Array<any>;

  constructor(
    private _metadataService: MetadataService,
    private _condicionService: CondicionService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.listaCondiciones = new Array<any>();
    this.selectedProperties = new Array<any>();
    this._condicion = new Condicion();
    this._metadataService.getMetadataCondicion().map(elem => {
      var elemModel = {
        'tipo': elem,
        'selected': false
      }
      this.listaCondiciones.push(elemModel);
    })
    debugger;
  }

  public checkValue(tipo){
    debugger;

    this.listaCondiciones.map(elem => {
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

   // this._condicion.sDesAcceso = descripcion;
    
  }

  onClickRemove(){
   this.selectedProperties.splice(this.selectedProperties.findIndex(e => e.tipo === this.selectedProperties[0].tipo),1)
   console.log(this.selectedProperties)
    // this.checkbox = null;
    //this.listaCondiciones[0].selected = false;
    this.removeCheckbox();
  }

  removeCheckbox(): void {
    debugger;
    let input = this.renderer.selectRootElement('.sacceso-opcion');
    this.renderer.setProperty(input, 'checked', false); 
    }

}
