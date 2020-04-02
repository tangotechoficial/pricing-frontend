import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'preciobbase',
  templateUrl: './preciobbase.component.html',
  styleUrls: ['../../precio/precio.component.scss', '../precioventa/precioventa.component.scss']
})
export class PreciobbaseComponent implements OnInit {

  isShow:boolean = false; //default false
  existNegocios: string;
  existVentas: string;

  constructor() { }

  ngOnInit() {
  }

  public goToSection() {
   this.isShow = !this.isShow;
  }

  parentListener($event){
    this.existNegocios = $event
  }

  parentListenerTwo($event){
    this.existVentas = $event
  }
}
