import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PurchasePlanningService } from '@services/purchasePlanning.service';
import { Filter} from '@models/filter';
import { Material} from '@models/material';
import { BillingBranch } from '@models/billingbranch';
import { ShipmentBranch } from '@models/shipmentbranch';
import { State } from '@models/state';

import { PlanningFilterModalService } from '@services/planfiltermodal.service';
import { PlanningDataManagerService } from '@app/services/planning-data.service';

// jQuery
declare var $: any;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'modal-plano',
  templateUrl: './filter-modal-plano.component.html',
  styleUrls: ['./filter-modal-plano.component.css'],
})
export class PlanningFilterModalComponent implements OnInit, OnDestroy {

  filterForm: FormGroup;
  filter: Filter = new Filter();
  disabled = true;

  @Input() filterParentScreen = '';


  // tslint:disable-next-line: no-output-rename
  @Output('update') submitted: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  // tslint:disable-next-line: no-output-rename
  @Output('updateFilter') filterData: EventEmitter<Filter> = new EventEmitter<Filter>();

  materials: Material[];
  billBranches: BillingBranch[];
  expBranches: ShipmentBranch[];
  uf: State[];

  constructor(
    private formBuilder: FormBuilder,
    private filterService: PlanningFilterModalService,
    private planningService: PurchasePlanningService,
    private spinner: NgxSpinnerService,
    private planningDataManager: PlanningDataManagerService
  ) {

  }
  ngOnDestroy(): void {

  }

  ngOnInit() {
    this.spinner.show();
    this.filterForm = this.formBuilder.group({
      codfilfat: [Validators.required],
      codfilepd: [Validators.required],
      codestuni: [Validators.required],
      codprd: [Validators.required]
    });
    this.filterService.filterCurrent.subscribe(filter => this.filter = filter);
    this.planningService.getShipmentBranches()
    .then( branches => { this.expBranches = branches; this.spinner.hide(); } );
  }

  private get form() {
    return this.filterForm;
  }

  loadBillingBranches(evt: any) {
    this.spinner.show();
    return this.planningService.getBillingBranches(evt.currentTarget.value)
    .then( billBranches => { this.billBranches = billBranches; this.spinner.hide(); } );
  }

  loadStates(evt: any) {
    this.spinner.show();
    return this.planningService.getStates(evt.currentTarget.value)
    .then( uf => { this.uf = uf; this.spinner.hide(); } );
  }

  loadProducts(evt: any) {
    this.spinner.show();
    return this.planningService.getProducts(evt.currentTarget.value)
    .then( materials => { this.materials = materials; this.spinner.hide(); } );
  }

  reset() {
    this.filterForm.reset();
    this.spinner.show();
  }

  setFilter() {
    this.filterService.setFilter(new Filter().deserialize(this.filterForm.value));
    this.submitted.emit(true);
    $('#modalFilter').modal('hide');
  }


}
