import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { PurchasePlanningService } from '@services/purchasePlanning.service'
import { first } from 'rxjs/operators'
import { PurchasePlan } from '@models/purchaseplan'

declare var $: any;

@Component({
  selector: 'app-plano-compra',
  templateUrl: './plano-compra.component.html',
  styleUrls: ['./plano-compra.component.scss'],
  providers: [ PurchasePlanningService],
})
export class PlanoCompraComponent implements OnInit {
  public planningData: Array<PurchasePlan> = new Array<PurchasePlan>();
  @Output() data = new EventEmitter<Array<PurchasePlan>>()
  constructor(
    private planningDataService: PurchasePlanningService,
  ) {

  }

  ngOnInit() {

  }

  filter() {
    $('#modalFilter').modal('show');
  }
}
