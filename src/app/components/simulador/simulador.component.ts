import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.scss']
})
export class SimuladorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  filter() {
    $('#modalFilter').modal('show')
  }

  showVerbaDetails() {
    $('#detailsModal').modal('show')
  }

  confirmAcceptance() {
    $('#confirmModal').modal('show')
  }
}
