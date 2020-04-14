import { NgxSpinnerService } from 'ngx-spinner';
import { PlanningFilterModalService } from '@services/planfiltermodal.service';
// tslint:disable-next-line: max-line-length
import { Component, OnInit, Output, EventEmitter, OnDestroy, Input, DoCheck, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
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
export class PlanoCompraComponent implements OnInit, OnDestroy, DoCheck {
  public planningData: Array<PurchasePlan>;
  @Output() data = new EventEmitter<Array<PurchasePlan>>();
  // tslint:disable-next-line: variable-name
  _submitted = false;
  done =  false;
  filter: Filter;
  constructor(
    private planningDataService: PurchasePlanningService,
    private filterService: PlanningFilterModalService,
    private planningDataManager: PlanningDataManagerService,
    private spinner: NgxSpinnerService,
  ) {

  }

  ngDoCheck(): void {
    if (this._submitted && !this.done) {
      this.spinner.show();
      this.planningDataService.getFilteredData(this.filter)
      .then((result) => {
        this.planningDataManager.setData(result);
        this.spinner.hide();
      })
      this._submitted = false;
      this.done = true;
    }

  }

  ngOnInit() {
    this.filterService.unsetFilter();
    this.modal();
    this.filterService.filterCurrent.pipe(untilDestroyed(this)).subscribe(filter => { this.filter = filter; });
    this.planningDataManager.actualPlanData
    .pipe(untilDestroyed(this))
    .subscribe(
      planningData => this.planningData = planningData
    );

  }

  @Input() isSubmitted(value) {
    this._submitted = value;

  }

  modal() {
    this.done = false;
    $('#modalFilter').modal('show');
  }
  ngOnDestroy(): void {

  }
}
