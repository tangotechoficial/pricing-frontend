import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'popupmenu',
  templateUrl: './popupmenu.component.html',
  styleUrls: ['./popupmenu.component.scss']
})
export class PopupmenuComponent implements OnInit {
  @Input() dataList: Array<any>;
  constructor() {}
  ngOnInit() {
  }


}
