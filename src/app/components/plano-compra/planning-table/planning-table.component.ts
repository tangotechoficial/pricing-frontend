import { Input, Component, OnInit } from '@angular/core';


@Component({
  selector: 'planning-table',
  templateUrl: './planning-table.component.html',
  styleUrls: ['./planning-table.component.css']
})
export class PlanningTableComponent implements OnInit {
  @Input() data;

  editable: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  trackByProd(index, item) {
    return item.codprd
  }


}
