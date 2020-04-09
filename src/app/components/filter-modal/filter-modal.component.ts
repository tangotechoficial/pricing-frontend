import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Filter} from '@models/filter'
import { Material} from '@models/material'
import { PriceComposition } from '@models/pricecomposition'
import { FilterModalService } from '@services/filtermodal.service'
import { NgxSpinnerService } from 'ngx-spinner';

// jQuery
declare var $: any;

@Component({
  selector: 'filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.css'],
  providers: [NgxSpinnerService]
})
export class FilterModalComponent implements OnInit, AfterViewInit {

  filterForm: FormGroup;
  filter: Filter = new Filter();
  disabled: boolean = true

  @Input() filterParentScreen: string = "";
  @Input() data: Array<PriceComposition>;

  @Output('update') submitted: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output('updateFilter') filterData: EventEmitter<Filter> = new EventEmitter<Filter>();

  materials: Set<Material> = new Set<Material>()
  billBranches: Array<string> = new Array<string>()
  expBranches: Array<string> = new Array<string>()
  uf: Array<string> = new Array<string>()

  constructor(
    private formBuilder: FormBuilder,
    private filterService: FilterModalService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.spinner.show()
    this.filterForm = this.formBuilder.group({
      codfilfat: [Validators.required],
      codfilemp: [Validators.required],
      codestuni: [Validators.required],
      desprd: [Validators.required]
    })
    this.filterService.materials.then(
      data =>{
        data.map(
          row => {
            this.materials.add(new Material().deserialize(row));
          }
        )
        this.disabled = false;
        this.spinner.hide()
      }
    )
  }

  buildList(fieldname) {
    let a = new Set<any>()

    this.data.forEach(item => {
      if (fieldname === 'CODFILFAT' || fieldname === 'CODFILEPD') {
        a.add(Number(item[fieldname]))
      } else {
        a.add(item[fieldname])
      }
    })
    return [...a].sort()
  }
  ngAfterViewInit() {

    this.billBranches = this.buildList('CODFILFAT')
    this.expBranches = this.buildList('CODFILEPD')
    this.uf = this.buildList('CODESTUNI')

    this.cdr.detectChanges()

  }

  private get form() {
    return this.filterForm;
  }


  reset() {
    this.filterForm.reset()
    this.filterData.emit(new Filter())
    $('#modalFilter').modal('hide')
  }


  submit() {
    this.filterData.emit(Object.assign({}, this.filter))
    this.submitted.emit(true)
    $('#modalFilter').modal('hide')
  }

}
