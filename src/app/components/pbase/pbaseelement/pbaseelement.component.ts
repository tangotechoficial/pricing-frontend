import { Component, Input } from '@angular/core';

@Component({
  selector: 'pbase-element',
  templateUrl: './pbaseelement.component.html',
  styleUrls: ['../../pbase/pbase.component.css']
})
export class PbaseElement {
  @Input() titulo: string;
  constructor(){
  }
}