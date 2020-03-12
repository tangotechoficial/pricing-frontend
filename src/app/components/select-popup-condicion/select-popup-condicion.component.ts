import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Condicion } from 'app/models/condicion';

declare var $: any;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'select-popup-condicion',
  templateUrl: './select-popup-condicion.component.html',
  styleUrls: ['./select-popup-condicion.component.scss']
})
export class SelectPopupCondicionComponent implements OnInit {
  @Output() closePopup: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedObject: EventEmitter<any> = new EventEmitter<any>();
  @Input() dataList: Array<any>;
  public currenObject: Condicion = new Condicion();

  constructor() {}

  ngOnInit() {
  }

  onSelectObject() {
    this.selectedObject.emit(this.currenObject);
    this.closePopup.emit(false);
  }

  onClosePopup() {
    this.closePopup.emit(false);
  }

  getSelectedCondicao(val: any , i: any) {
    this.currenObject.sCodCondicion = val.Cod_Condicao;
    this.selectItemColor(i);
  }

  selectItemColor(item: number) {
    $('tr').removeClass('mySelect');
    $('tr').eq(item + 1).addClass('mySelect');
   }

}
