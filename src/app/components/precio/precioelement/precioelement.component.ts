import { Component, Input, Renderer2, ElementRef} from '@angular/core';

@Component({
  selector: 'precio-element',
  templateUrl: './precioelement.component.html',
  styleUrls: ['../../precio/precio.component.scss']
})
export class PrecioElement {

  @Input() titulo: string; 
  
  ngOnInit() {
    //this.getDOMElement();
  }

  getDOMElement(): void {
    /* let el = this.renderer.selectRootElement('.custom-control-input');
    console.log(el);
    this.renderer.setAttribute(el, 'alt', 'pepe'); */
  }

 
}

