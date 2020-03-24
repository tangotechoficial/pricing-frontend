import { Component, OnInit ,Input, Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'select-popup-faturamento',
  templateUrl: './select-popup-faturamento.component.html',
  styleUrls: ['../select-popup-condicion/select-popup-condicion.component.scss']
})
export class SelectPopupFaturamentoComponent implements OnInit {
  @Input() dataFaturamento: Array <any>;
  @Output() closePopup: EventEmitter<any> = new EventEmitter<any>();
  public selectedItem = false;
  constructor() { }

  ngOnInit() {
    console.log(this.dataFaturamento)
  }

  getSelectedFaturamento(vañ: any, index: any) {

  }

  onSelectObject() {

  }
  onClosePopup() {
    this.closePopup.emit(false);
  }

}
