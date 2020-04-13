import { Input, Component, AfterViewInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray } from '@angular/forms';



@Component({
  // tslint:disable-next-line: component-selector
  selector: 'planning-table',
  templateUrl: './planning-table.component.html',
  styleUrls: ['./planning-table.component.css']
})
export class PlanningTableComponent implements AfterViewInit {
  _data: any;
  @Input() hasRealized;
  constructor() {

  }

  @Input() set data(data: any) {
    if (data) {
      this._data = data;
    }
  }

  get data(): any {
    return this._data;
  }

  private buildFormGroups() {
    if (!this._data === undefined) {
      return;
    }

  }
  ngAfterViewInit() {
    this.buildFormGroups();
  }

  captureChanges(evt) {
    return;
  }


}
