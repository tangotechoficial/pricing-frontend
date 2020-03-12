import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'select-condicion',
  templateUrl: './select-condicion.component.html',
  styleUrls: ['./select-condicion.component.scss']
})
export class SelectCondicionComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
    $('#myModal').modal('show');
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    $('#myModal').modal('hide');
  }

}
