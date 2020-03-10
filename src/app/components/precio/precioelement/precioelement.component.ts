import { Component, Input, Renderer2, ElementRef, OnInit } from "@angular/core";
import { CondicionService } from "../../../services/condicion.service"

interface IElement {
  id: number;
  codCondicao: number;
  desCondicao: String;
  typeValue: any;
  mandatoria: boolean;
  estadistica: boolean;
}

@Component({
  selector: "precio-element",
  templateUrl: "./precioelement.component.html",
  styleUrls: ["../../precio/precio.component.scss"],
  providers: [CondicionService]
})

export class PrecioElement implements OnInit{
  @Input() titulo: string;
  @Input() idCamada: string;
  condicaos: Array<IElement> = [];

  constructor (
    private _condicionService: CondicionService
  ) {}
  
  ngOnInit() {
    //this.getDOMElement();
    // traer via servicio los elementos segun tipo
    this._condicionService.getCondicao()
      .then(data => {
        this.condicaos = data.filter(e => e.id_Camada == this.idCamada)
        console.log({data})
        console.log({condicaos: this.condicaos})
      })
      .catch(err => alert(err))

  }

  parseData(data) {
    return 
  }

  add() {
    
    const element = {
      id: 0,
      codCondicao: 0,
      desCondicao: "desc",
      typeValue: "A",
      mandatoria: true,
      estadistica: false
    }
    this.condicaos.push(element)
  }
  

  getDOMElement(): void {
    /* let el = this.renderer.selectRootElement('.custom-control-input');
    console.log(el);
    this.renderer.setAttribute(el, 'alt', 'pepe'); */
  }
}
