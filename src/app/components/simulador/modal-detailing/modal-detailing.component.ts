import { Component, OnInit } from '@angular/core';
// jQuery
declare var $: any;

@Component({
  selector: 'modal-detailing',
  templateUrl: './modal-detailing.component.html',
  styleUrls: ['./modal-detailing.component.css']
})
export class ModalDetailingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  submit() {
    $('#detailsModal').modal('hide')
  }
}
