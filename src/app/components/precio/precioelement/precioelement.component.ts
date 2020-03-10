import { Component, Input, Renderer2, ElementRef } from "@angular/core";

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
  styleUrls: ["../../precio/precio.component.scss"]
})

export class PrecioElement {
  @Input() titulo: string;
  elements: Array<IElement> = [];


  ngOnInit() {
    //this.getDOMElement();
    // traer via servicio los elementos segun tipo

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
    this.elements.push(element)
  }
  

  getDOMElement(): void {
    /* let el = this.renderer.selectRootElement('.custom-control-input');
    console.log(el);
    this.renderer.setAttribute(el, 'alt', 'pepe'); */
  }
}
