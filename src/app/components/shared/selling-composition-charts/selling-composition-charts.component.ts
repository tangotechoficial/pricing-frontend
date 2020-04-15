import { Component, OnInit, Input } from '@angular/core';
import { PurchasePlan } from './../../../models/purchaseplan';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { PlanningDataManagerService } from './../../../services/planning-data.service';
import { sellingData } from '../../../helpers/selling';
import { Label } from 'ng2-charts';
import data from '@datasources/plano-de-compras.json';


@Component({
  selector: 'selling-composition-charts',
  templateUrl: './selling-composition-charts.component.html',
  styleUrls: ['./selling-composition-charts.component.css']
})
export class SellingCompositionChartsComponent {
  sellingData = sellingData;
  public chartOptions: ChartOptions = {
    responsive: true,
  };
  public chartLabels: Label[] = ['S1', 'S2', 'S3', 'S4', 'S5'];
  public chartPlugins = [];
  public volumeCompositionType: ChartType = 'pie';
  public volumeCompositionChartData: ChartDataSets[] = [
    { data: null, label: 'Sugerido', backgroundColor: ['#6289CF', '#FF6F50', '#E6DE4C', '#E66C43', '#79F09F', '#4270C1'] },
  ];
  planningData: PurchasePlan[];


  constructor(private planningDataManager: PlanningDataManagerService) {}

  updateChartsData() {
      this.volumeCompositionChartData[0].data = []
      this.volumeCompositionChartData[0].data.push(1,2,3,4,5,6)
      // this.planningData.map((row, i, arr) => {
      // let val = row.VLRMRGBRTCAL * row.VLRVNDPRVCTR / row.VLRPCOVNDLIQCAL;
      // this.marginChartData[0].data.push(val);
      // val = row.VLRMRGBRTOCD * row.VLRVNDLIQOCD / row.VLRPCOVNDLIQOCD;
      // this.marginChartData[1].data.push(val);
      // this.sellingChartData[0].data.push(row.VLRVNDPRVCTR);
      // this.sellingChartData[1].data.push(row.VLRVNDLIQOCD);
      // this.competitivityChartData[0].data.push(row.VLRMCDCAL);
      // this.competitivityChartData[1].data.push(row.VLRMCDOCD);
  }

  @Input() set data(data: any) {
    if (data) {
      this.planningData = data;
      this.updateChartsData();
    }
  }

}
