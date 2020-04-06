import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'impact-indicator',
  templateUrl: './impact-indicator.component.html',
  styleUrls: ['./impact-indicator.component.css']
})
export class ImpactIndicatorComponent implements OnInit {

  @Input() title
  @Input() indicatorValue
  @Input() symbol

  outputValue: string;

  constructor() { }

  ngOnInit() {

    this.outputValue = `${this.indicatorValue}` + `${this.symbol}`

  }



}
