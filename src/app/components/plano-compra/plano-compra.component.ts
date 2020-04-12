import { FilterModalService } from '@services/filtermodal.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { PurchasePlanningService } from '@services/purchasePlanning.service';
import { PlanningDataManagerService } from '@app/services/planning-data.service';
import { first } from 'rxjs/operators';
import { PurchasePlan } from '@models/purchaseplan';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Filter } from '@models/filter';

declare var $: any;

@Component({
  selector: 'app-plano-compra',
  templateUrl: './plano-compra.component.html',
  styleUrls: ['./plano-compra.component.scss'],
  providers: [ PurchasePlanningService],
})
export class PlanoCompraComponent implements OnInit, OnDestroy {
  public planningData: Array<PurchasePlan>;
  @Output() data = new EventEmitter<Array<PurchasePlan>>()
  filter: Filter;
  constructor(
    private planningDataService: PurchasePlanningService,
    private filterService: FilterModalService,
    private planningDataManager: PlanningDataManagerService
  ) {

  }
  ngOnDestroy(): void {

  }

  ngOnInit() {
    this.modal()
    this.filterService.filterCurrent.pipe(untilDestroyed(this)).subscribe(filter => {this.filter = filter;});
    this.planningDataManager.actualPlanData
    .pipe(untilDestroyed(this))
    .subscribe(
      diretrixes => this.planningData = diretrixes
    );

  }

  modal() {
    $('#modalFilter').modal('show');
  }
}
