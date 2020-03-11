import { Component, OnInit } from "@angular/core";
import { CondicionService } from "../../../services/condicion.service"

@Component({
  selector: "preciobase",
  templateUrl: "./preciobase.component.html",
  styleUrls: ["../../precio/precio.component.scss"],
  providers: [CondicionService]
})
export class PrecioBaseComponent implements OnInit {
  isShow = false;
  existNegocios: string;
  existVentas: string;

  elements = [];
  
  constructor(
    private _condicionService: CondicionService
  ) {}

  ngOnInit() {
    // traer por servicio cada condicion
    this._condicionService.getCamadas()
    .then(data => this.elements = this.parseResponseCamada(data))
    .catch(err => alert(err))
  }

  parseResponseCamada(data) {
    return data.filter(e => e.TIPO_BASE_VENDAS === "B")
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
