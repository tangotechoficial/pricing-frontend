import { Component, OnInit } from "@angular/core";

@Component({
  selector: "preciobase-business",
  templateUrl: "./preciobase.component.html",
  styleUrls: ["./preciobase.component.scss"]
})
export class PrecioBaseBusinessComponent implements OnInit {
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
