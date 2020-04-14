import { PurchasePlan } from './../../../models/purchaseplan';
import { PlanningDataManagerService } from './../../../services/planning-data.service';
import { Component, OnInit, OnDestroy, DoCheck, Input } from '@angular/core';
import { marginData } from '@helpers/marginData';
import { competitivityData } from '@helpers/competitivity';
import { sellingData } from '@helpers/selling';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tabbed-charts',
  templateUrl: './tabbed-charts.component.html',
  styleUrls: ['./tabbed-charts.component.css'],
  providers: [NgxSpinnerService]
})

export class TabbedChartsComponent{
  marginData = marginData;
  competitivityData = competitivityData;
  sellingData = sellingData;

  somaVendasPlanejado = 0;
  somaVendasSugerido = 0;
  sellingIndicator = 0;
  sellPercent = 0;

  somaMargemPlanejada = 0
  somaMargemSugerida = 0
  marginIndicator = 0;

  somaCompetitividadePlanejada = 0
  somaCompetitividadeSugerida = 0
  competitivityIndicator = 0;
  planningData: PurchasePlan[];

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
    layout: {
      padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10
      }
    },
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
    }
  };
  public chartLabels: Label[] = ['S1', 'S2', 'S3', 'S4', 'S5'];
  public chartType: ChartType = 'bar';
  public chartPlugins = [];

  public marginChartData: ChartDataSets[] = [
    { data: null, label: 'Sugerido', backgroundColor: '#6289CF' },
    { data: null, label: 'Planjedo', backgroundColor: '#FF6F50'}
  ];

  public competitivityChartData: ChartDataSets[] = [
    { data: null, label: 'Sugerido', backgroundColor: '#6289CF'},
    { data: null, label: 'Planjedo', backgroundColor: '#FF6F50'}
  ];

  public sellingChartData: ChartDataSets[] = [
    { data: null , label: 'Sugerido', backgroundColor: '#6289CF'},
    { data: null, label: 'Planjedo', backgroundColor: '#FF6F50'}
  ];

  constructor(private planningDataManager: PlanningDataManagerService) { }

  updateChartsData() {

    this.marginChartData[0].data = [];
    this.marginChartData[1].data = [];
    this.sellingChartData[0].data = [];
    this.sellingChartData[1].data = [];
    this.competitivityChartData[0].data = [];
    this.competitivityChartData[1].data = [];
    this.somaVendasSugerido = 0;
    this.somaVendasPlanejado = 0;
    this.sellingIndicator = 0;

    this.planningData.map((row, i, arr) => {
      let val = row.VLRMRGBRTCAL * row.VLRVNDPRVCTR / row.VLRPCOVNDLIQCAL;
      this.marginChartData[0].data.push(val);
      val = row.VLRMRGBRTOCD * row.VLRVNDLIQOCD / row.VLRPCOVNDLIQOCD;
      this.marginChartData[1].data.push(val);
      this.sellingChartData[0].data.push(row.VLRVNDPRVCTR);
      this.sellingChartData[1].data.push(row.VLRVNDLIQOCD);
      this.competitivityChartData[0].data.push(row.VLRMCDCAL);
      this.competitivityChartData[1].data.push(row.VLRMCDOCD);

    });

    //calcula soma de vendas alcançadas sugerida
    this.sellingChartData[0].data.forEach(element => {
          this.somaVendasSugerido = this.somaVendasSugerido + Number(element)
    })
    //calcula soma de vendas alcançadas planejada
    this.sellingChartData[1].data.forEach(element => {
          this.somaVendasPlanejado = this.somaVendasPlanejado + Number(element)
    })
    //calcula margem sugerida
    this.marginChartData[0].data.forEach(element => {
          this.somaMargemPlanejada = this.somaMargemPlanejada + Number(element)
    })
    //calcula margem planejada
    this.marginChartData[1].data.forEach(element => {
          this.somaMargemSugerida = this.somaMargemSugerida + Number(element)
    })

    //calcula competitividade sugerida
    this.competitivityChartData[0].data.forEach(element => {
          this.somaMargemPlanejada = this.somaMargemPlanejada + Number(element)
    })
    //calcula competitividade planejada
    this.marginChartData[1].data.forEach(element => {
          this.somaCompetitividadeSugerida = this.somaCompetitividadePlanejada + Number(element)
    })


    this.sellingIndicator = this.somaVendasSugerido - this.somaVendasPlanejado;
    this.sellPercent = this.sellingIndicator / (this.somaVendasPlanejado/this.sellingChartData.length);
    this.marginIndicator = this.somaMargemSugerida - this.somaMargemPlanejada;
    this.competitivityIndicator = this.somaCompetitividadeSugerida - this.somaCompetitividadePlanejada;
  }


  @Input() set data(data: any) {
    if (data) {
      this.planningData = data;
      this.updateChartsData();
    }
  }
}
