import { Input, Component, AfterViewInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray } from '@angular/forms';



@Component({
  selector: 'planning-table',
  templateUrl: './planning-table.component.html',
  styleUrls: ['./planning-table.component.css']
})
export class PlanningTableComponent implements AfterViewInit {
  _data: any;

  editable: boolean = false;
  formGroups: FormArray;
  dataFilter: any;

  constructor() {

  }

  @Input() set data(data: any) {
    if(data){
      this._data = data
    }
  }

  get data(): any {
    return this._data
  }

  private buildFormGroups()
  {
    const groups = this._data.map(
      row =>  {
        const group = new FormGroup({
          'verba_especie_planejado': new FormControl(row.verba_especie_planejado, null),
          'cmv_planejado': new FormControl(row.cmv_planejado, null)
        });
        return group
      }
    )
    this.formGroups = new FormArray(groups);
  }
  ngAfterViewInit() {
    this.buildFormGroups()
  }

  getControl(index: number, field: string): FormControl {
    if (!this.formGroups.length ){
      this.buildFormGroups();
    }

    return this.formGroups.at(index).get(field) as FormControl;
  }

  updateField(index: number, field: string) {
    const control = this.getControl(index, field)
    if ( control.valid ) {
      this.data = this.data.map( (row, idx) => {
        if (index === idx) {
          return {
            ...row,
            [field]: control.value
          }
        }
        return row
      })
    }
  }
  captureChanges(evt) {
    return;
  }
  filter(evtResult) {
    this.dataFilter = evtResult
  }

}
