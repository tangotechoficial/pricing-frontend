import { Component, OnInit } from '@angular/core';
import { PurchasePlanningService } from '@services/purchasePlanning.service'
import { first } from 'rxjs/operators'
declare var $: any;

@Component({
  selector: 'app-plano-compra',
  templateUrl: './plano-compra.component.html',
  styleUrls: ['./plano-compra.component.scss'],
  providers: [ PurchasePlanningService ]
})
export class PlanoCompraComponent implements OnInit {
  public planningData: Array<any>;
  constructor(
    private planningDataService: PurchasePlanningService
  ) {
    this.planningData = new Array<any>();
  }

  ngOnInit() {
    this.planningDataService.planningData.pipe(first()).subscribe(
      data => this.planningData = data.default, // should change this in real world
      err => console.log(err)
    )
  }

  filter() {
    $('#modalFilter').modal('show')
  }
}
