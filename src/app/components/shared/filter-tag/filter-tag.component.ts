import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { Filter } from '@models/filter'
@Component({
  selector: 'filter-tag',
  templateUrl: './filter-tag.component.html',
  styleUrls: ['./filter-tag.component.css']
})
export class FilterTagComponent implements OnInit {

  filterData: Array<{}>

  constructor() { }

  ngOnInit() {

  }
  remove($evt) {
    const badge = $evt.target.parentElement
    const field = badge.dataset.field
    this.filter.nullify(field)
    this.filterChange.emit(this.filter)
    badge.remove()
  }

}
