import { Component, OnInit, Input } from '@angular/core'
import { marginData } from '@helpers/marginData'
import { competitivityData } from '@helpers/competitivity'
import { sellingData } from '@helpers/selling'
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'tabbed-charts',
  templateUrl: './tabbed-charts.component.html',
  styleUrls: ['./tabbed-charts.component.css'],
  providers: [NgxSpinnerService]
})

export class TabbedChartsComponent implements OnInit {
  private _data: any
  view: any[] = [300, 200]

  colors = {
    domain: ['#2a7824', 'rgb(181, 49, 49)']
  }
  marginData = marginData
  competitivityData = competitivityData
  sellingData = sellingData


  type;
  data_list = [
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
  ];
  dataChart;
  options;

  constructor(
    private spinner: NgxSpinnerService

  ) {

  }

  @Input() set data(data: any) {
    this.spinner.show()
    if (data) {
      this._data = data
    }
    this.spinner.hide()
  }

  get data(): any {
    return this._data
  }


  ngOnInit() {
    this.chartCreate();
  }

  chartCreate() {
    this.type = 'doughnut';
    this.dataChart = {
      labels: ["Planejado", "Sugerido"],
      datasets: [
        {
          data: this.data_list,
          backgroundColor: [
            '#FF6F50',
            '#E6E6E6',
          ],
        },
      ]
    };
    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        animateScale: true,
        animateRotate: true,
      },
      legend: {
        display: true,
        labels: {
          fontColor: 'rgb(255, 99, 132)'
        },
        position: 'bottom'
      },
      circumference: Math.PI,
      rotation: -Math.PI
    };
  }
}
