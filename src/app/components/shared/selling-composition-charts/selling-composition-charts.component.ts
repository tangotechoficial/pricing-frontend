import { Component, OnInit, Input } from '@angular/core';
import { PurchasePlan } from './../../../models/purchaseplan';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { PlanningDataManagerService } from './../../../services/planning-data.service';
import { sellingData } from '../../../helpers/selling';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'selling-composition-charts',
  templateUrl: './selling-composition-charts.component.html',
  styleUrls: ['./selling-composition-charts.component.css']
})
export class SellingCompositionChartsComponent {

  sellingData = sellingData;
  public chartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
    events: [
      'click'
    ]
  };

  public ariaLabels: string[] = [];
  public volumeCompositionType: ChartType = 'pie';
  public volumeCompositionChartDataSugerido: ChartDataSets[] = [];
  public sugeridoLabels: Label[] = ['Impostos', 'Devolução', 'Margem Bruta Unitária', 'Verba Sugerida', 'Verba Planejada', 'CMV Sugerido'];
  public volumeCompositionChartDataPlanejado: ChartDataSets[] = [];
  public planejadoLabels: Label[] = ['Impostos', 'Devolução', 'Margem Bruta Unitária', 'Verba Sugerida', 'Verba Planejada', 'CMV Planejado'];
  public plugins = [pluginDataLabels];
  public chartLegend = true

  planningData: PurchasePlan[];


  constructor(private planningDataManager: PlanningDataManagerService) {}

  updateChartsData() {
      this.planningData.forEach((item, index) => {
        this.ariaLabels.push(`nav-week${index + 1}`);
        const impostos = Number(item.VLRIMPTOTCAL).toFixed(2);
        const devolucao = Number(item.VLRDVLCAL).toFixed(2);
        const margemBrutaUnitaria = Number(item.VLRMRGBRTCAL).toFixed(2);
        const verbaSugerida = Number(item.VLRRBTOCD).toFixed(2);
        const verbaPlanejada = Number(item.VLRVBAOCD).toFixed(2);
        const cmvPrecoSugerido = Number(item.VLRCMVCAL).toFixed(2);
        this.volumeCompositionChartDataSugerido[index] = {
          data: [],
          label: 'Sugerido',
          backgroundColor: ['#6289CF', '#FF6F50', '#E6DE4C', '#E66C43', '#79F09F', '#4270C1']
        };
        this.volumeCompositionChartDataSugerido[index].data.push(
          impostos, devolucao, margemBrutaUnitaria, verbaSugerida, verbaPlanejada, cmvPrecoSugerido
        );
      })
      this.planningData.forEach((item, index) => {
        this.volumeCompositionChartDataPlanejado[index] = {
          data: [],
          label: 'Planejado',
          backgroundColor: ['#6289CF', '#FF6F50', '#E6DE4C', '#E66C43', '#79F09F', '#4270C1']
        };
        const impostos = Number(item.VLRIMPTOTOCD).toFixed(2);
        const devolucao = Number(item.VLRDVLOCD).toFixed(2);
        const margemBrutaUnitaria = Number(item.VLRMRGBRTOCD).toFixed(2);
        const verbaSugerida = Number(item.VLRRBTCAL).toFixed(2);
        const verbaPlanejada = Number(item.VLRVBAOCD).toFixed(2);
        const cmvPrecoSugerido = Number(item.VLRCMVOCD).toFixed(2);
        this.volumeCompositionChartDataPlanejado[index].data.push(
            impostos, devolucao, margemBrutaUnitaria, verbaSugerida, verbaPlanejada, cmvPrecoSugerido);
      });
  }

  @Input() set data(data: any) {
    if (data) {
      this.planningData = data;
      this.updateChartsData();
    }
  }

}
