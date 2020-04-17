import { PlannedData } from '@app/models/plannedData';
import { PlanningDataManagerService } from '@app/services/planning-data.service';
import { PlanningRequest } from './../../../models/planningrequest';
import { PlanningPopupDataManagerService } from './../../../services/planning-popup.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

declare var $: any;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'planning-popup',
  templateUrl: './planning-popup.component.html',
  styleUrls: ['./planning-popup.component.css']
})
export class PlanningPopupComponent implements OnInit {
  planningPopForm: FormGroup;
  planningRequest: PlanningRequest;

  @Output() submitted: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() result: EventEmitter<PlannedData> = new EventEmitter<PlannedData>();

  constructor(
    private formBuilder: FormBuilder,
    private popupService: PlanningPopupDataManagerService,
    private planningDataManager: PlanningDataManagerService
  ) {
      this.planningRequest = new PlanningRequest()
      this.popupService.currentWeek.subscribe(week => this.planningRequest.week = Number(Number(week).toFixed(2)));
      this.popupService.currentMonth.subscribe(month => this.planningRequest.plan_month = Number(Number(month).toFixed(2)));
      this.popupService.currentYear.subscribe(year => this.planningRequest.plan_year = Number(Number(year).toFixed(2)));
      this.popupService.currentState.subscribe(state => this.planningRequest.est = state);
      this.popupService.currentProduct.subscribe(product => this.planningRequest.prd = product);
      this.popupService.currentCMV.subscribe(cmv => this.planningRequest.cmvcmp = Number(Number(cmv).toFixed(2)));
      this.popupService.currentVerba.subscribe(verba => this.planningRequest.vrbpln = Number(Number(verba).toFixed(2)));
      this.planningPopForm = this.formBuilder.group({
        week: [''],
        plan_month: [''],
        plan_year: [''],
        prd: [''],
        est: [''],
        vrbpln: [''],
        cmvcmp: [''],
      });
   }

  ngOnInit() {

  }

  submit() {
    this.planningRequest = new PlanningRequest().deserialize(this.planningPopForm.value);
    this.popupService.setRequestData(this.planningRequest);
    this.popupService.requestPlannedData().then(
      response => {
        this.submitted.emit(true)
        this.result.emit(response);
        $('#planningPopup').hide();
      }
    ).catch(error =>{
       console.error(error);
       this.submitted.emit(false)
    });
  }

  close()
  {
    $('#planningPopup').hide()
  }

}

