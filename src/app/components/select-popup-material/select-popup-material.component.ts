import { Component, OnInit ,Input, Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'select-popup-material',
  templateUrl: './select-popup-material.component.html',
  styleUrls: ['../select-popup-condicion/select-popup-condicion.component.scss']
})
export class SelectPopupMaterialComponent implements OnInit {
  @Input() dataMaterial: Array <any>
  @Output() closePopup: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onClosePopup() {
    this.closePopup.emit(false);
  }


}
