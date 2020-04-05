import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
 import { Filter } from '@models/filter'
 @Component({
   selector: 'filter-tag',
   templateUrl: './filter-tag.component.html',
   styleUrls: ['./filter-tag.component.css']
 })
export class FilterTagComponent implements OnInit, OnChanges {
  @Input() filter: Filter
  @Output() filterChange: EventEmitter<Filter> = new EventEmitter<Filter>();

  filters: Array<any> = new Array()
  filterData: Array<{}>

   constructor() { }

   ngOnInit() {
    if(this.filter){
      Object.keys(this.filter).map(
        (value, idx) => this.filters.push(this.filter[value])
      )
    }
  }

  ngOnChanges() {
    if(this.filter){
      Object.keys(this.filter).map(
        (value, idx) => this.filters.push(this.filter[value])
      )
    }
    this.filterChange.emit(this.filter)
 }

   remove($evt) {
     const badge = $evt.target.parentElement
     const field = badge.dataset.field
     this.filter.nullify(field)
     this.filterChange.emit(this.filter)
     badge.remove()
   }

 }
