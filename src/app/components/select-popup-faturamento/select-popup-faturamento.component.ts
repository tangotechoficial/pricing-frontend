import { Component, OnInit ,Input, Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'select-popup-faturamento',
  templateUrl: './select-popup-faturamento.component.html',
  styleUrls: ['../select-popup-condicion/select-popup-condicion.component.scss']
})
export class SelectPopupFaturamentoComponent implements OnInit {
  @Input() dataFaturamento: Array <any>
  @Output() closePopup: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {

  }

  onClosePopup() {
    this.closePopup.emit(false);
  }

}
