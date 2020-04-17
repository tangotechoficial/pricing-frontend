import { NgxSpinnerService } from 'ngx-spinner';
import { PurchasePlanningService } from '@services/purchasePlanning.service';
import { weeks } from '@datasources/plano-de-compras.json';
import { PlanningDataManagerService } from '@app/services/planning-data.service';
import { Group } from '@app/models/group';
import { Input, Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { PlannedData } from '@models/plannedData';
import { PlanningPopupDataManagerService } from '@app/services/planning-popup.service';

declare var $: any;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'planning-table',
  templateUrl: './planning-table.component.html',
  styleUrls: ['./planning-table.component.scss']
})
export class PlanningTableComponent implements AfterViewInit {
  // tslint:disable-next-line: variable-name
  _data: any;
  @Input() hasRealized;
  fullForm: FormGroup;
  plannedData: PlannedData[];
  modalMessage: string;
  @Output() dataUpdated: EventEmitter<boolean>;
  submitted = false;

  private filterParams$: any;
  constructor(
    private formBuilder: FormBuilder,
    private popupService: PlanningPopupDataManagerService,
    private planningDataManager: PlanningDataManagerService,
    private purchasePlanningService: PurchasePlanningService,
    private spinner: NgxSpinnerService
    ) {
      this.plannedData = []
      this.fullForm = new FormGroup({});
      this._data = this.planningDataManager.currentPlanValue;
      this.planningDataManager.actualPlanData.subscribe(planningData => this._data = planningData);
      this.filterParams$ = this.purchasePlanningService.currentFilterParamsValue;
      this.purchasePlanningService.currentFilterParams.subscribe(params => this.filterParams$ = params);
      this.dataUpdated = new EventEmitter<boolean>(false)
  }

  buildGroups() {
    const weeksGroup = new FormGroup({});
    this._data.map( (row, index) => {
      const str = row.NUMANOMESSMN;
      row.week = str.slice(-1);
      row.year = str.slice(0, 4);
      row.month = str.slice(4, 6);
      weeksGroup.addControl('week' + index, this.buildFormGroup(row));
    });
    this.fullForm.addControl('weeks', weeksGroup);
  }

  @Input() set data(data: any) {
    if (data) {
      this.buildGroups();
    }
  }



  get data(): any {
    return this._data;
  }

  private buildFormGroup(data) {
    return this.formBuilder.group({
      ID: [data.id],
      CODPRD: [data.CODPRD],
      CODFILEPD: [data.CODFILEPD],
      CODFILFAT: [data.CODFILFAT],
      CODESTUNI: [data.CODESTUNI],
      NUMANOMESSMN: [data.NUMANOMESMN],
      VLRVNDLIQCAL: [Number(data.VLRVNDLIQCAL).toFixed(2)],
      VLRVNDLIQOCD: [Number(data.VLRVNDLIQOCD).toFixed(2)],
      VLRMCDOCD: [Number(data.VLRMCDOCD).toFixed(2)],
      VLRPCOMEDMCD: [Number(data.VLRPCOMEDMCD).toFixed(2)],
      VLRPCOVNDLIQOCD: [Number(data.VLRPCOVNDLIQOCD).toFixed(2)],
      VLRPCOBSEOCD: [Number(data.VLRPCOBSEOCD).toFixed(2)],
      VLRIMPTOTOCD: [Number(data.VLRIMPTOTOCD).toFixed(2)],
      VLRICMOCD: [Number(data.VLRICMOCD).toFixed(2)],
      VLRPISOCD: [Number(data.VLRPISOCD).toFixed(2)],
      VLRDVLOCD: [Number(data.VLRDVLOCD).toFixed(2)],
      VLRFLXPLN: [Number(data.VLRFLXPLN).toFixed(2)],
      VLRMRGBRTOCD: [Number(data.VLRMRGBRTOCD).toFixed(2)],
      VLRRBTCAL: [Number(data.VLRRBTCAL).toFixed(2)],
      VLRVBAOCD: [Number(data.VLRVBAOCD).toFixed(2)],
      VLRCMVPCOATU: [Number(data.VLRCMVPCOATU).toFixed(2)],
      VLRCSTCMPIDL: [Number(data.VLRCSTCMPIDL).toFixed(2)]
    });

  }
  ngAfterViewInit() {
    this.popupService.actualPlanData.subscribe(data => this.plannedData.push(data));
    this.planningDataManager.actualPlanData.subscribe(planningData => this._data = planningData);
    this.buildGroups();
  }

  isComplete() {
    return Object.keys(this.fullForm.get('weeks').controls).every(form => {return this.fullForm.controls.weeks.get(form).dirty})
  }
  updatePlan($event) {
    const weeksData = {};
    const week = 'week' + (Number($event.NUMANOMESSMN.slice(-1)) - 1).toString();
    weeksData[week] = {...$event};
    this.fullForm.patchValue({weeks: weeksData});
    this.fullForm.get('weeks').get(week).markAsDirty()
  }

  submitForm() {
    this.spinner.show()
    const result = this.planningDataManager.submitPlan(this.fullForm, this.filterParams$)
    result.then( results => {
      const success = results.every(res => res === true);
      if (success) {
        alert('As informações foram salvas com sucesso!');
      } else {
        alert('Houve um problema ao salvar os dados! Comunique a um administrador');
      }
      this.spinner.hide();
      this.dataUpdated.emit(true);
      this.submitted = true;
    })
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
