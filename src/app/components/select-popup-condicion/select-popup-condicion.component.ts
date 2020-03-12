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

<<<<<<< HEAD
  getSelectedCondicao(val: any , i: any) {
=======
  getSelectedCondicao(val: any , i:number) {
>>>>>>> be6a855ad442b082384320b66463b4a33a83a1ec
    this.currenObject.sCodCondicion = val.Cod_Condicao;
    this.selectItemColor(i);
  }

  selectItemColor(item: number) {
    $('tr').removeClass('mySelect');
    $('tr').eq(item + 1).addClass('mySelect');
   }

}
