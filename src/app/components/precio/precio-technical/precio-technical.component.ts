import { Component, Input } from '@angular/core';

@Component({
  selector: 'precio-technical',
  templateUrl: './precio-technical.component.html',
  styleUrls: ['../../precio/precio.component.scss']
})
export class PrecioTechnical {

  @Input() titulo: string; 
  
  ngOnInit() {
    //this.getDOMElement();
  }

 
}

