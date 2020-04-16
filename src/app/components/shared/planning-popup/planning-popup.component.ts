import { PlanningRequest } from './../../../models/planningrequest';
import { PlanningPopupDataManagerService } from './../../../services/planning-popup.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

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

  constructor(
    private formBuilder: FormBuilder,
    private popupService: PlanningPopupDataManagerService
  ) {
      this.planningRequest = new PlanningRequest()
      this.popupService.currentWeek.subscribe(week => this.planningRequest.week = Number(week));
      this.popupService.currentMonth.subscribe(month => this.planningRequest.plan_month = Number(month));
      this.popupService.currentYear.subscribe(year => this.planningRequest.plan_year = Number(year));
      this.popupService.currentState.subscribe(state => this.planningRequest.est = state);
      this.popupService.currentProduct.subscribe(product => this.planningRequest.prd = product);
      this.popupService.currentCMV.subscribe(cmv => this.planningRequest.cmvcmp = Number(cmv));
      this.popupService.currentVerba.subscribe(verba => this.planningRequest.vrbpln = Number(verba));
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
        console.log(response)
        $('#planningPopup').hide()
      }
    ).catch(error => console.error(error));
  }

  close()
  {
    $('#planningPopup').hide()
  }

}

