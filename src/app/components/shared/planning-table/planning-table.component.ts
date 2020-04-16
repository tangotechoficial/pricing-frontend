import { Input, Component, AfterViewInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { PlannedData } from '@models/plannedData';
import { PlanningPopupDataManagerService } from '@app/services/planning-popup.service';

declare var $: any;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'planning-table',
  templateUrl: './planning-table.component.html',
  styleUrls: ['./planning-table.component.css']
})
export class PlanningTableComponent implements AfterViewInit {
  // tslint:disable-next-line: variable-name
  _data: any;
  @Input() hasRealized;
  fullForm: FormGroup;
  formArray: FormArray;
  plannedData: PlannedData[];


  constructor(
    private formBuilder: FormBuilder,
    private popupService: PlanningPopupDataManagerService
    ) {
      this.plannedData = []
    // this.fullForm = this.formBuilder.group()
  }

  @Input() set data(data: any) {
    if (data) {
      this._data = data;
      this._data.map( row => {
        const str = row.NUMANOMESSMN;
        row.week = str.slice(-1);
        row.year = str.slice(0, 4);
        row.month = str.slice(4, 6);

      });
    }
  }



  get data(): any {
    return this._data;
  }

  private buildFormGroups() {
    if (!this._data === undefined) {
      // this._data.map( resultRow => {
      //   const formGroup = this.formBuilder.group({
      //     CODPRD: [''],
      //     CODFILEPD: [''],
      //     CODFILFAT: [''],
      //     CODESTUNI: [''],
      //     NUMANOMESSMN: [''],
      //     VLRVNDLIQCAL: [''],
      //     VLRVNDLIQOCD: [''],
      //     VLRMCDOCD: [''],
      //     VLRPCOMEDMCD: [''],
      //     MRGBRTPEROCD: [''],
      //     VLRPCOVNDLIQOCD: [''],
      //     VLRPCOBSEOCD: [''],
      //     VLRIMPTOTOCD: [''],
      //     VLRICMOCD: [''],
      //     VLRPISOCD: [''],
      //     VLRDVLOCD: [''],
      //     VLRFLXPLN: [''],
      //     VLRMRGBRTOCD: [''],
      //     VLRRBTCAL: [''],
      //     VLRVBAOCD: [''],
      //     VLRCMVCAL: [''],
      //     VLRCMVPCOATU: [''],
      //     VLRCSTCMPIDL: ['']
      //   });

      //   this.fullForm.push(formGroup)

      // });
      return;
    }

  }

  ngAfterViewInit() {
    this.buildFormGroups();
    this.popupService.actualPlanData.subscribe(data => this.plannedData.push(data));
  }

  captureChanges(evt) {
    return;
  }

  triggerModalFor($event) {
    $('#planningPopup').show();
    this.popupService
      .setMonth($event.month)
      .setYear($event.year)
      .setWeek($event.week)
      .setProduct($event.CODPRD)
      .setState($event.CODESTUNI)
      .setPlannedVerba($event.VLRVBAOCD)
      .setPlannedCMV($event.VLRCSTCMPIDL);
  }

}
