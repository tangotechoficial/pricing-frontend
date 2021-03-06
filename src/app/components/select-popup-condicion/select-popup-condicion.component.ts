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
    console.log(this.dataList)
  }

  onSelectObject() {
    this.selectedObject.emit(this.currenObject);
    this.closePopup.emit(false);
  }

  onClosePopup() {
    this.closePopup.emit(false);
  }

  getSelectedCondicao(condicao: Condicao , i: any) {
    this.currenObject = condicao;
    this.selectItemColor(i);
    this.selectedItem = true;
  }

  selectItemColor(item: number) {
    $('tr').removeClass('mySelect');
    $('tr').eq(item + 1).addClass('mySelect');
   }

}
