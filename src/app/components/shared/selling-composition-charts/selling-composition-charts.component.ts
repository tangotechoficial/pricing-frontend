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
  public volumeCompositionChartDataSugerido: ChartDataSets[] = [
    { data: [], label: 'Sugerido', backgroundColor: ['#6289CF', '#FF6F50', '#E6DE4C', '#E66C43', '#79F09F', '#4270C1'] },
    { data: [], label: 'Sugerido', backgroundColor: ['#6289CF', '#FF6F50', '#E6DE4C', '#E66C43', '#79F09F', '#4270C1'] },
    { data: [], label: 'Sugerido', backgroundColor: ['#6289CF', '#FF6F50', '#E6DE4C', '#E66C43', '#79F09F', '#4270C1'] },
    { data: [], label: 'Sugerido', backgroundColor: ['#6289CF', '#FF6F50', '#E6DE4C', '#E66C43', '#79F09F', '#4270C1'] },
    { data: [], label: 'Sugerido', backgroundColor: ['#6289CF', '#FF6F50', '#E6DE4C', '#E66C43', '#79F09F', '#4270C1'] },
  ];
  public volumeCompositionChartDataPlanejado: ChartDataSets[] = [
      { data: [], label: 'Planejado', backgroundColor: ['#6289CF', '#FF6F50', '#E6DE4C', '#E66C43', '#79F09F', '#4270C1'] },
      { data: [], label: 'Planejado', backgroundColor: ['#6289CF', '#FF6F50', '#E6DE4C', '#E66C43', '#79F09F', '#4270C1'] },
      { data: [], label: 'Planejado', backgroundColor: ['#6289CF', '#FF6F50', '#E6DE4C', '#E66C43', '#79F09F', '#4270C1'] },
      { data: [], label: 'Planejado', backgroundColor: ['#6289CF', '#FF6F50', '#E6DE4C', '#E66C43', '#79F09F', '#4270C1'] },
      { data: [], label: 'Planejado', backgroundColor: ['#6289CF', '#FF6F50', '#E6DE4C', '#E66C43', '#79F09F', '#4270C1'] },

  ];
  planningData: PurchasePlan[];


  constructor(private planningDataManager: PlanningDataManagerService) {}

  updateChartsData() {
      this.planningData.map((item, index) => {
              let impostos = Number(item.VLRIMPTOTCAL);
              let devolucao = Number(item.VLRDVLCAL);
              let margemBrutaUnitaria = Number(item.VLRMRGBRTCAL);
              let verbaSugerida = Number(item.VLRRBTOCD);
              let verbaPlanejada = Number(item.VLRVBAOCD);
              let cmvPrecoSugerido = Number(item.VLRCMVCAL)
        console.log(this.volumeCompositionChartDataSugerido[index].data.push(impostos, devolucao, margemBrutaUnitaria, verbaSugerida, verbaPlanejada, cmvPrecoSugerido))
      })
      this.planningData.map((item, index) => {
              let impostos = Number(item.VLRIMPTOTOCD);
              let devolucao = Number(item.VLRDVLOCD);
              let margemBrutaUnitaria = Number(item.VLRMRGBRTOCD);
              let verbaSugerida = Number(item.VLRRBTCAL);
              let verbaPlanejada = Number(item.VLRVBAOCD);
              let cmvPrecoSugerido = Number(item.VLRCMVOCD);
        console.log(this.volumeCompositionChartDataPlanejado[index].data.push(impostos, devolucao, margemBrutaUnitaria, verbaSugerida, verbaPlanejada, cmvPrecoSugerido))
      })
      console.log(this.volumeCompositionChartDataSugerido)
      console.log(this.volumeCompositionChartDataPlanejado)
  }

  @Input() set data(data: any) {
    if (data) {
      this.planningData = data;
      this.updateChartsData();
    }
  }

}
