import { Component, OnInit ,Input, Output , EventEmitter} from '@angular/core';

declare var $: any;

@Component({
  selector: 'select-popup-regiao',
  templateUrl: './select-popup-regiao.component.html',
  styleUrls: ['../select-popup-condicion/select-popup-condicion.component.scss']
})
export class SelectPopupRegiaoComponent implements OnInit {
  @Input() dataRegiao: Array <any>
  @Output() closePopup: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedRegiao: EventEmitter<any> = new EventEmitter<any>();
  public currentRegiao: any;

  constructor() { }

  ngOnInit() {
  }

  onSelectedRegiao() {
    this.selectedRegiao.emit(this.currentRegiao);
    this.closePopup.emit(false);
  }


  onClosePopup() {
    this.closePopup.emit(false);
  }

  getSelectedRegiao(val: any, index: any) {
    this.currentRegiao = val;
    this.selectItemColor(index);
  }

  selectItemColor(item: number) {
    $('tr').removeClass('selectedItem');
    $('tr').eq(item + 1).addClass('selectedItem');
   }

}
