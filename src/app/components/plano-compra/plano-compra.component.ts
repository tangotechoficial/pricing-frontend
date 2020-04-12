import { NgxSpinnerService } from 'ngx-spinner';
import { PlanningFilterModalService } from '@services/planfiltermodal.service';
// tslint:disable-next-line: max-line-length
import { Component, OnInit, Output, EventEmitter, OnDestroy, Input, DoCheck } from '@angular/core';
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
  filter: Filter;
  constructor(
    private planningDataService: PurchasePlanningService,
    private filterService: PlanningFilterModalService,
    private planningDataManager: PlanningDataManagerService,
    private spinner: NgxSpinnerService
  ) {

  }
  ngDoCheck(): void {
    if (this._submitted) {

      this.spinner.show();
      this.planningDataService.getFilteredData(this.filter)
      .then((result) => {
        this.planningDataManager.setData(result);
        this.spinner.hide();
      });
    }
  }
  ngOnInit() {
    this.modal();
    this.filterService.filterCurrent.pipe(untilDestroyed(this)).subscribe(filter => { this.filter = filter; });
    this.planningDataManager.actualPlanData
    .pipe(untilDestroyed(this))
    .subscribe(
      diretrixes => this.planningData = diretrixes
    );

  }

  @Input() isSubmitted(value) {
    console.log(value)
    this._submitted = value;
  }
  modal() {
    $('#modalFilter').modal('show');
  }
  ngOnDestroy(): void {

  }
}
