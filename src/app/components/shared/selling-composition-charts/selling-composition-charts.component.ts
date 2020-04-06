import { Component, OnInit } from '@angular/core';
import {sellingData} from '@helpers/sellingdata'
@Component({
  selector: 'selling-composition-charts',
  templateUrl: './selling-composition-charts.component.html',
  styleUrls: ['./selling-composition-charts.component.css']
})
export class SellingCompositionChartsComponent implements OnInit {

  view: any[] = [650, 300];
  sellingData: any;
  showXAxisLabel: boolean = true;  
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  constructor() { }

  ngOnInit() {
    this.sellingData = sellingData
  }

}
