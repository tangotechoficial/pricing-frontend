import { PurchasePlan } from './../../../models/purchaseplan';
import { PlanningDataManagerService } from './../../../services/planning-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
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

export class TabbedChartsComponent implements OnInit, OnDestroy{
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

  dataLoaded = false;
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
  };
  public chartLabels: Label[] = ['S1', 'S2', 'S3', 'S4', 'S5'];
  public chartType: ChartType = 'bar';
  public chartPlugins = [];

  public marginChartData: ChartDataSets[] = [
    { data: [], label: 'Sugerido', backgroundColor: '#6289CF' },
    { data: [], label: 'Planjedo', backgroundColor: '#FF6F50'}
  ];

  public competitivityChartData: ChartDataSets[] = [
    { data: [], label: 'Sugerido', backgroundColor: '#6289CF'},
    { data: [], label: 'Planjedo', backgroundColor: '#FF6F50'}
  ];

  public sellingChartData: ChartDataSets[] = [
    { data: [] , label: 'Sugerido', backgroundColor: '#6289CF'},
    { data: [], label: 'Planjedo', backgroundColor: '#FF6F50'}
  ];

  constructor(private planningDataManager: PlanningDataManagerService) {
  }

  ngOnDestroy(): void {

  }

  // Vendas
 //VLRVNDPRVCTR - Sugerido -> idx 0
 //VLRVNDLIQOCD - Planejado -> idx 1

 // Competitividade
 /**
  * VLRMCDCAL - Sugerido
  * VLRMCDOCD - Planejado
  */

 //Margem
 /**
  * VLRMRGBRTCAL * VLRVNDPRVCTR / VLRPCOVNDLIQCAL (Sugerido)
  * VLRMRGBRTOCD * VLRVNDLIQOCD / VLRPCOVNDLIQOCD (Planejado)
  */

  ngOnInit(): void {
    console.log('init')
    this.planningDataManager.actualPlanData
    .subscribe(
      planningData => {
        planningData.map((row, i, arr) => {
          let val = row.VLRMRGBRTCAL * row.VLRVNDPRVCTR / row.VLRPCOVNDLIQCAL;
          this.marginChartData[0].data.push(val);

          val = row.VLRMRGBRTOCD * row.VLRVNDLIQOCD / row.VLRPCOVNDLIQOCD;
          this.marginChartData[1].data.push(val);

          this.sellingChartData[0].data.push(row.VLRVNDPRVCTR);
          this.sellingChartData[1].data.push(row.VLRVNDLIQOCD);
          this.competitivityChartData[0].data.push(row.VLRMCDCAL);
          this.competitivityChartData[1].data.push(row.VLRMCDOCD);



        });
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


      this.sellingIndicator = this.somaVendasSugerido - this.somaVendasPlanejado
      this.sellPercent = this.sellingIndicator / (this.somaVendasPlanejado/this.sellingChartData.length)
      this.marginIndicator = this.somaMargemSugerida - this.somaMargemPlanejada
      this.competitivityIndicator = this.somaCompetitividadeSugerida - this.somaCompetitividadePlanejada
      console.log(this.competitivityChartData[0].data)
      console.log(this.competitivityChartData[1].data)
      console.log(this.competitivityIndicator)
      console.log(this.marginChartData[0].data)
      console.log(this.marginChartData[1].data)
      console.log(this.marginIndicator)
      console.log(this.sellPercent)
  }
}
