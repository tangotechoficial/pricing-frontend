import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Condicion } from 'app/models/condicion';
import { Condicao } from 'app/models/condicao';

declare var $: any;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'select-popup-condicion',
  templateUrl: './select-popup-condicion.component.html',
  styleUrls: ['./select-popup-condicion.component.scss']
})
export class SelectPopupCondicionComponent implements OnInit {
  @Output() closePopup: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedObject: EventEmitter<Condicao> = new EventEmitter<Condicao>();
  @Input() dataList: Array<Condicao>;
  public currenObject: Condicao = new Condicao();
  selectedItem: boolean = false;

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

  getSelectedCondicao(condicao: Condicao , index: any) {
    this.currenObject = condicao;
    this.selectItemColor(index);
    this.selectedItem = true;
  }

  selectItemColor(item: number) {
    $('tr').removeClass('selectedItem');
    $('tr').eq(item + 1).addClass('selectedItem');
   }

}
