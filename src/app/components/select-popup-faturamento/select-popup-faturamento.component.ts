import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';

declare var $: any;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'select-popup-faturamento',
  templateUrl: './select-popup-faturamento.component.html',
  styleUrls: ['../select-popup-condicion/select-popup-condicion.component.scss']
})
export class SelectPopupFaturamentoComponent implements OnInit {
  @Input() dataFaturamento: Array <any>;
  @Output() closePopup: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedFaturamento: EventEmitter<any> = new EventEmitter<any>();
  public currentFaturamento: any;
  constructor() { }

  ngOnInit() {
  }


  onSelectedFaturamento() {
    this.selectedFaturamento.emit(this.currentFaturamento);
    this.closePopup.emit(false);
  }

  onClosePopup() {
    this.closePopup.emit(false);
  }

  getSelectedFaturamento(val: any, index: any) {
    this.currentFaturamento = val;
    this.selectItemColor(index);
  }

  selectItemColor(item: number) {
    $('tr').removeClass('selectedItem');
    $('tr').eq(item + 1).addClass('selectedItem');
   }


}
