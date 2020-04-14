import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'impact-indicator',
  templateUrl: './impact-indicator.component.html',
  styleUrls: ['./impact-indicator.component.css']
})
export class ImpactIndicatorComponent implements OnChanges{

  title$: string;
  symbol$: string;
  indicatorValue$: number;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.indicatorValue$ = changes.indicatorValue.currentValue;
  }



  @Input() set indicatorValue(value) {
    this.indicatorValue$ = value;
  }

  @Input() set symbol(value) {
    this.symbol$ = value;
  }

  @Input() set title(value) {
    this.title$ = value;
  }



}
