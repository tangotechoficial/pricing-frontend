import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Filter } from '@models/filter'
@Component({
  selector: 'filter-tag',
  templateUrl: './filter-tag.component.html',
  styleUrls: ['./filter-tag.component.css']
})
export class FilterTagComponent implements OnInit, OnChanges {
  @Input() filterModel: Filter
  filters: any = []

  constructor() { }

  ngOnInit() {
    if(this.filterModel){
      this.filters = this.filterModel
    }
  }

  ngOnChanges() {
    if(this.filterModel){
      this.filters = this.filterModel
    }
  }

  remove($evt) {
    const badge = $evt.target.parentElement
    const field = badge.dataset.field
    this.filterModel.nullify(field)
    badge.remove()
    return false;
  }

}
