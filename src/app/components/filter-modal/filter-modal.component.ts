import { Component, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Filter} from '@models/filter';
import filterData from '@datasources/filter.json'

// jQuery
declare var $: any;

@Component({
  selector: 'filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.css']
})
export class FilterModalComponent implements OnInit, OnChanges {

  filterForm: FormGroup;
  filter: Filter = new Filter();
  filterParentScreen: string = "";
  @Output('update') outputFilter: EventEmitter<Filter> = new EventEmitter<Filter>();
  categories: any[] = []
  subCats: any[] = []
  providers: any[] = []
  branches: any[] = []
  ufList: any[] = []
  materials: any[] = []

  filterData: any;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.filterData = filterData
  }

  ngOnInit() {

    this.filterForm = this.formBuilder.group({
      linha_negocio: [Validators.required],
      descgrpprd: [Validators.required],
      desctgprd: [Validators.required],
      desdivfrn: [Validators.required],
      codfilemp: [Validators.required],
      codestuni: [Validators.required],
      desprd: [Validators.required]
    })
  }

  ngOnChanges() {
    debugger
    this.outputFilter.emit(this.filter);
  }

  private get form() {
    return this.filterForm;
  }

  resetSelects() {
    this.categories = []
    this.subCats = []
    this.providers = []
    this.branches = []
    this.ufList = []
    this.materials = []
  }

  reset() {
    this.filter = new Filter();
    this.outputFilter.emit(this.filter)
    this.resetSelects()
  }

  loadCategory() {

    this.categories = this.filterData['category'][this.filter.linha_negocio]
  }
  loadSubCategory() {
    this.subCats = this.filterData['subCategory'][this.filter.linha_negocio][this.filter.descgrpprd]
  }
  loadProvider() {
    this.providers = this.filterData['provider'][this.filter.linha_negocio][this.filter.descgrpprd][this.filter.desctgprd]
  }
  loadBranches() {
    this.branches = this.filterData['expedition_branch'][this.filter.linha_negocio][this.filter.descgrpprd][this.filter.desctgprd][this.filter.desdivfrn]
  }
  loadUFDest() {
    this.ufList = this.filterData['uf'][this.filter.linha_negocio][this.filter.descgrpprd][this.filter.desctgprd][this.filter.desdivfrn][this.filter.codfilemp]
  }
  loadMaterials() {
    this.materials = this.filterData['material'][this.filter.linha_negocio][this.filter.descgrpprd][this.filter.desctgprd][this.filter.desdivfrn][this.filter.codfilemp][this.filter.codestuni]
  }


  submit() {
    this.filter.deserialize(this.form.value);
    this.outputFilter.emit(this.filter);
    $('#modalFilter').modal('hide')
  }

}
