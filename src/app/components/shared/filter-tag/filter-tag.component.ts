import { Component, Input, OnInit } from '@angular/core';
import { Filter } from '@models/filter'
@Component({
  selector: 'filter-tag',
  templateUrl: './filter-tag.component.html',
  styleUrls: ['./filter-tag.component.css']
})
export class FilterTagComponent implements OnInit {
  @Input() filterModel: Filter

  constructor() { }

  ngOnInit() {
  }

}
