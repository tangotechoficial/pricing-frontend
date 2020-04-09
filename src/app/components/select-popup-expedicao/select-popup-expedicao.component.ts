import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';

declare var $: any;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'select-popup-expedicao',
  templateUrl: './select-popup-expedicao.component.html',
  styleUrls: ['../select-popup-condicion/select-popup-condicion.component.scss']
})
export class SelectPopupExpedicaoComponent implements OnInit {
  @Input() dataExpedicao: Array <any>;
  @Output() closePopup: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedExpedicao: EventEmitter<any> = new EventEmitter<any>();
  public currentExpedicao: any;

  constructor() { }

  ngOnInit() {

  }

  onSelectExpedicao() {
    this.selectedExpedicao.emit(this.currentExpedicao);
    this.closePopup.emit(false);
  }

  onClosePopup() {
    this.closePopup.emit(false);
  }

  getSelectedExpedicao(val: any, index: any) {
    this.currentExpedicao = val;
    this.selectItemColor(index);
  }

  selectItemColor(item: number) {
    $('tr').removeClass('selectedItem');
    $('tr').eq(item + 1).addClass('selectedItem');
   }

}
