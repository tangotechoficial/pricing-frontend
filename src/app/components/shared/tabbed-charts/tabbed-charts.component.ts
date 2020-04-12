import { Component, OnInit, Input} from '@angular/core'
import {marginData} from '@helpers/marginData'
import {competitivityData} from '@helpers/competitivity'
import {sellingData } from '@helpers/selling'
import { Observable } from 'rxjs'
import { first } from 'rxjs/operators'
import { NgxSpinnerService } from 'ngx-spinner';
import {PurchasePlanningService} from '@services/purchasePlanning.service'
import { PurchasePlan } from '@models/purchaseplan'


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
  constructor(
    private spinner: NgxSpinnerService

  ) {

  }

  @Input() set data(data: any) {
    this.spinner.show()
    if(data){
      this._data = data
    }
    this.spinner.hide()
  }

  get data(): any {
    return this._data
  }


  ngOnInit() {

  }




}
