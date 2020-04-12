import { Component } from '@angular/core'
import { marginData } from '@helpers/marginData'
import { competitivityData } from '@helpers/competitivity'
import { sellingData } from '@helpers/selling'
import { NgxSpinnerService } from 'ngx-spinner';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'tabbed-charts',
  templateUrl: './tabbed-charts.component.html',
  styleUrls: ['./tabbed-charts.component.css'],
  providers: [NgxSpinnerService]
})

export class TabbedChartsComponent {
  marginData = marginData
  competitivityData = competitivityData
  sellingData = sellingData

  public chartOptions: ChartOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    legend: {
      display: true,
      position: 'bottom'
    },
  };
  public chartLabels: Label[] = ['S1', 'S2', 'S3', 'S4', 'S5'];
  public chartType: ChartType = 'bar';
  public chartPlugins = [];

  public marginChartData: ChartDataSets[] = [
    { data: Array.from({length: 5}, () => Math.floor(Math.random() * 100)), label: 'Sugerido', backgroundColor: '#6289CF' },
    { data: Array.from({length: 5}, () => Math.floor(Math.random() * 100)), label: 'Planjedo', backgroundColor: '#FF6F50'}
  ];

  public competitivityChartData: ChartDataSets[] = [
    { data: Array.from({length: 5}, () => Math.floor(Math.random() * 100)), label: 'Sugerido', backgroundColor: '#6289CF'},
    { data: Array.from({length: 5}, () => Math.floor(Math.random() * 100)), label: 'Planjedo', backgroundColor: '#FF6F50'}
  ];

  public sellingChartData: ChartDataSets[] = [
    { data: Array.from({length: 5}, () => Math.floor(Math.random() * 100)), label: 'Sugerido', backgroundColor: '#6289CF'},
    { data: Array.from({length: 5}, () => Math.floor(Math.random() * 100)), label: 'Planjedo', backgroundColor: '#FF6F50'}
  ];
}
