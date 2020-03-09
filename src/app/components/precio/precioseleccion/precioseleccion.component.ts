import { Component, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'precio-seleccion',
  templateUrl: './precioseleccion.component.html',
  styleUrls: ['./precioseleccion.component.scss']
})
export class PrecioSeleccion{

  public canalDeVentas: string = "Descricao"
  public lineaDeNegocios: string = "Descricao"
  @Output() negociosOutput = new EventEmitter<string>()
  @Output() ventasOutput = new EventEmitter<string>()
  exampleChild: string

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }

  onClickLineaDeNegocio(lineaDeNegocios) {
    this.lineaDeNegocios = lineaDeNegocios
    this.negociosOutput.emit(this.lineaDeNegocios)
  }

  onClickCanalDeVentas(canalDeVentas) {
    this.canalDeVentas = canalDeVentas
    this.ventasOutput.emit(this.canalDeVentas)
  }

 /*  exampleMethodChild() {
    this.exampleOutput.emit(this.exampleChild)
    
  } */
}
