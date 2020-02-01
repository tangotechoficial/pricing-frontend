import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'precio-seleccion',
  templateUrl: './precioseleccion.component.html',
  styleUrls: ['./precioseleccion.component.css']
})
export class PrecioSeleccion implements OnInit {

  public canalDeVentas: string = "Descricao"
  public lineaDeNegocios: string = "Descricao"

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  onClickLineaDeNegocio(lineaDeNegocios) {
    console.log({lineaDeNegocios})
    this.lineaDeNegocios = lineaDeNegocios
  }

  onClickCanalDeVentas(canalDeVentas) {
    this.canalDeVentas = canalDeVentas
  }


}
