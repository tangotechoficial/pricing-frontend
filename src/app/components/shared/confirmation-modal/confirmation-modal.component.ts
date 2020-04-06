import { Component, OnInit } from '@angular/core';
// jQuery
declare var $: any;


@Component({
  selector: 'confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  decline() {
    $('#confirmModal').modal('hide')
  }

  accept() {
    $('#confirmModal').modal('hide')
  }

}
