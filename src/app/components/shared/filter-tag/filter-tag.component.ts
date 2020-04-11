import { Component, Input, OnInit, OnChanges, Output, EventEmitter, SimpleChanges, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Filter } from '@models/filter'
import { FilterModalService } from '@services/filtermodal.service'
 @Component({
   selector: 'filter-tag',
   templateUrl: './filter-tag.component.html',
   styleUrls: ['./filter-tag.component.css'],
   providers: [FilterModalService]
 })
export class FilterTagComponent implements OnInit, OnChanges, AfterViewInit {
  _filter: Filter = new Filter()
  @Output('updateFilter') filterData: EventEmitter<Filter> = new EventEmitter<Filter>()
  props_map = {
    codfilfat: "FF",
    codfilepd: "FE",
    codprd: "Material",
    codestuni: "UF"
  }

  rev_map = {
    "FF": "codfilfat",
    "FE": "codfilepd",
    "Material": "codprd",
    "UF": "codestuni"
  }
  filters: Array<any>

   constructor(
     private filterService: FilterModalService,
     private cdr: ChangeDetectorRef
   ) {

   }

   removeFromFilters(key, value) {
     this.filters.filter(elem => this.filters[this.rev_map[key]] !== value  )
     this._filter[key] = null
   }

   buildFiltersArray() {
     if(this._filter) {
       this.filters = new Array()
       Object.keys(this._filter).map(
         (value, idx) => {
           if(this._filter[value] !== undefined && this._filter[value] !== null) {
             let obj = {}
             if (value == 'codprd') {
              obj[this.props_map[value]] = this._filter[value].split('-')[1]
             } else {
              obj[this.props_map[value]] = this._filter[value]
             }
             
             this.filters.push(obj)
           }
         }
       )
     }
   }

   ngOnInit() {
     this.filterService.filterCurrent.subscribe( filter => this.filter = filter)
     this.buildFiltersArray()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.buildFiltersArray()
    this._filter = changes.filter.currentValue
    this.cdr.detectChanges()
  }

  ngAfterViewInit() {
    this._filter = this.filterService.currentFilterValue

  }

  @Input() set filter(value) {
    this._filter = value
  }

  private updateFilter(field) {
    this._filter[this.rev_map[field]] = null
    let filter = Object.assign({}, this._filter)
    this.filterData.emit(filter)
    this.filterService.setFilter(filter)
  }

  remove($evt) {
   const badge = $evt.target.parentElement
   const field = badge.dataset.field
   const value = badge.dataset.value
   this.removeFromFilters(field,value)
   this.updateFilter(field)
   badge.remove()
  }

}
