import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'select-popup-expedicao',
  templateUrl: './select-popup-expedicao.component.html',
  styleUrls: ['../select-popup-condicion/select-popup-condicion.component.scss']
})
export class SelectPopupExpedicaoComponent implements OnInit {
  @Input() dataExpedicao: Array <any>;
  @Output() closePopup: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    console.log(this.dataExpedicao);
  }

  onSelectExpedicao() {

  }

  onClosePopup() {
    this.closePopup.emit(false);
  }
  getSelectedExpedicao(val: any, index: any) {

  }

}
