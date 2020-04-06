import { Component, OnInit } from '@angular/core';
import { PurchasePlanningService } from '@services/purchasePlanning.service'
import { first } from 'rxjs/operators'
import { PurchasePlan } from '@models/purchaseplan'
declare var $: any;

@Component({
  selector: 'app-execucao',
  templateUrl: './execucao.component.html',
  styleUrls: ['./execucao.component.scss'],
  providers: [ PurchasePlanningService],
})
export class ExecucaoComponent implements OnInit {
  public planningData: Array<any> = new Array<any>();

  constructor(
    private planningDataService: PurchasePlanningService
  ) { }

  ngOnInit() {

    this.planningDataService.planningData.pipe(first()).subscribe(
          data => data.results.map(
            row => {
              this.planningData.push(new PurchasePlan().deserialize(row))
            }
          ), // should change this in real world
          err => console.log(err)
        )
  }



  filter() {
    $('#modalFilter').modal('show')
  }
}
