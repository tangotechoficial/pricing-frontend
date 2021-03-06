import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';

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

  getSelectedFaturamento(val: any, index: any) {
    this.currentFaturamento = val;
  }

  onSelectedFaturamento() {
    this.selectedFaturamento.emit(this.currentFaturamento);
    this.closePopup.emit(false);
  }

  onClosePopup() {
    this.closePopup.emit(false);
  }

}
