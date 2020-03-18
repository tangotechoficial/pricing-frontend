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

  getSelectedCondicao(val: any , i: any) {
    this.currenObject.sId = val.id;
    this.currenObject.sCodCondicion = val.Cod_Condicao;
    this.currenObject.sDesCondicion = val.Desc_Condicao;
    this.currenObject.bEscalaQtde = val.Escala_Qtde === 1 ? true : false;
    this.currenObject.bNeg = val.POS_NEG === 'N' ? true : false;
    this.currenObject.bPos = val.POS_NEG === 'P' ? true : false;
    this.currenObject.MANDATORIA = val.MANDATORIA;
    this.currenObject.ESTATISTICA = val.ESTATISTICA;
    this.selectItemColor(i);
    this.selectedItem = true;
  }

  selectItemColor(item: number) {
    $('tr').removeClass('mySelect');
    $('tr').eq(item + 1).addClass('mySelect');
   }

}
