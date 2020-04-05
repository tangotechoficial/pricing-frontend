import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tabbed-charts',
  templateUrl: './tabbed-charts.component.html',
  styleUrls: ['./tabbed-charts.component.css']
})
export class TabbedChartsComponent implements OnInit {

  @Input() data: any
  
  constructor() { }

  ngOnInit() {
  }

}
