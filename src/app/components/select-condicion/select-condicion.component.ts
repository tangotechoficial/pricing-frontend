import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var $: any;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'select-condicion',
  templateUrl: './select-condicion.component.html',
  styleUrls: ['./select-condicion.component.scss']
})
export class SelectCondicionComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    $('#myModal').modal('show');
  }

}
