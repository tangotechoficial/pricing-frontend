import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'infolet',
  templateUrl: './infolet.component.html',
  styleUrls: ['./infolet.component.css']
})
export class InfoletComponent implements OnInit {
  @Input() title: string
  @Input() symbol: string
  @Input() value: string
  
  constructor() { }

  ngOnInit() {
  }

}
