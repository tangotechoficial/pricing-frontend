import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Filter} from '@models/filter';
import { Material} from '@models/material';
import { BillingBranch } from '@models/billingbranch';
import { ShipmentBranch } from '@models/shipmentbranch';

import { PlanningFilterModalService } from '@services/planfiltermodal.service';

// jQuery
declare var $: any;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'modal-plano',
  templateUrl: './filter-modal-plano.component.html',
  styleUrls: ['./filter-modal-plano.component.css'],
})
export class PlanningFilterModalComponent implements OnInit {

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
  uf: Array<string> = new Array<string>();

  constructor(
    private formBuilder: FormBuilder,
    private filterService: PlanningFilterModalService,
  ) {

  }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      codfilfat: [Validators.required],
      codfilepd: [Validators.required],
      codestuni: [Validators.required],
      codprd: [Validators.required]
    });
    this.filterService.filterCurrent.subscribe(filter => this.filter = filter);

  }

  private get form() {
    return this.filterForm;
  }


  reset() {
    this.filterForm.reset();
    this.filterData.emit(new Filter());
    $('#modalFilter').modal('hide');
  }


  submit() {
    this.filterData.emit(Object.assign({}, this.filter));
    this.submitted.emit(true);
    this.filterService.setFilter(Object.assign({}, this.filter));
    $('#modalFilter').modal('hide');
  }

}
