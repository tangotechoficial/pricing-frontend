import { Component, Input, OnInit } from '@angular/core';
import { Filter } from '@models/filter'
@Component({
  selector: 'filter-tag',
  templateUrl: './filter-tag.component.html',
  styleUrls: ['./filter-tag.component.css']
})
export class FilterTagComponent implements OnInit {
  @Input() filterModel: Filter
  filters: any = []

  constructor() { }

  ngOnInit() {
    if(this.filterModel){
      this.filters = Object.values(this.filterModel).filter(val => val !== null || val!== undefined)
    }

  }

}
