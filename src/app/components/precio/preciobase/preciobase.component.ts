import { Component, OnInit } from "@angular/core";

@Component({
  selector: "preciobase",
  templateUrl: "./preciobase.component.html",
  styleUrls: ["../../precio/precio.component.scss"]
})
export class PrecioBaseComponent implements OnInit {
  isShow = false;
  existNegocios: string;
  existVentas: string;

  elementsCMV = [];
  elementsREGULATORIO = [];
  elementsOPERACIONAL = [];
  elementsVERBA = [];
  elementsMARGEM = [];

  constructor() {}

  ngOnInit() {
    // traer por servicio cada condicion
    
  }

  public goToSection() {
    //this._router.navigate(['/pbase']);
    this.isShow = !this.isShow;
  }

  parentListener($event) {
    this.existNegocios = $event;
  }

  parentListenerTwo($event) {
    this.existVentas = $event;
  }
}
