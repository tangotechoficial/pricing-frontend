import { Component, OnInit ,Input, Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'select-popup-filial',
  templateUrl: './select-popup-filial.component.html',
  styleUrls: ['../select-popup-condicion/select-popup-condicion.component.scss']
})
export class SelectPopupFilialComponent implements OnInit {
  @Input() dataFilial: Array <any>
  @Output() closePopup: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.dataFilial = [{"Cod_Filial":123 , "Desc_Filial":"descripcion mi filial"}]
  }

  onClosePopup() {
    this.closePopup.emit(false);
  }

}
