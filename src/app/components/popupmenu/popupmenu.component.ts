import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'popupmenu',
  templateUrl: './popupmenu.component.html',
  styleUrls: ['./popupmenu.component.scss']
})
export class PopupmenuComponent implements OnInit {
  @Output() closePopup: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedObject: EventEmitter<any> = new EventEmitter<any>();
  @Input() dataList: Array<any>;
  public currenObject: any;
  selectedItem: boolean = false;

  constructor() {}
  ngOnInit() {
  }

  onSelectObject() {
    this.selectedObject.emit(this.currenObject);
    this.closePopup.emit(false);
  }

  onClosePopup() {
    this.closePopup.emit(false);
  }

  getSelectedChaveContas(val: any, i: any) {
    this.currenObject = val;
    this.selectItemColor(i);
    this.selectedItem = true;
  }

  selectItemColor(item: number) {
    $('tr').removeClass('mySelect');
    $('tr').eq(item + 1).addClass('mySelect');
   }


}
