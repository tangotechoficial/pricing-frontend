import { Component, OnInit ,Input, Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'select-popup-material',
  templateUrl: './select-popup-material.component.html',
  styleUrls: ['../select-popup-condicion/select-popup-condicion.component.scss']
})
export class SelectPopupMaterialComponent implements OnInit {
  @Input() dataMaterial: Array <any>;
  @Output() closePopup: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedMaterial: EventEmitter<any> = new EventEmitter<any>();
  public currentMaterial: any;

  constructor() {}

  ngOnInit() {

  }

  onSelectedMaterial() {
    this.selectedMaterial.emit(this.currentMaterial);
    this.closePopup.emit(false);
  }

  onClosePopup() {
    this.closePopup.emit(false);
  }

  getSelectedMaterial(val: any, index: any) {
    this.currentMaterial = val;
  }

}
