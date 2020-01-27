import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'precioventa',
  templateUrl: './precioventa.component.html',
  styleUrls: ['../../precio/precio.component.css']
})
export class PrecioVentaComponent implements OnInit {
  isShow = false;

  constructor() { }

  ngOnInit() {
  }

  public goToSection() {
   this.isShow = !this.isShow;
  }

}
