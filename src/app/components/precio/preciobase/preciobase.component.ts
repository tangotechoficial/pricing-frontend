import { Component, OnInit } from "@angular/core";
import { CondicionService } from "../../../services/condicion.service"

@Component({
  selector: "preciobase",
  templateUrl: "./preciobase.component.html",
  styleUrls: ["../../precio/precio.component.scss"],
  providers: [CondicionService]
})
export class PrecioBaseComponent implements OnInit {
  public sCurrentUser = JSON.parse(localStorage.getItem("User"));
  public bBusiness: boolean;

  camadas = [];
  isShow: boolean;
  existNegocios: any;
  existVentas: any;
  loading: boolean = true;
  
  constructor(
    private _condicionService: CondicionService
  ) {}

  ngOnInit() {
    // traer por servicio cada condicion
    this._condicionService.getCamadas()
    .then(data => {
      this.camadas = this.parseResponseCamada(data)
      this.loading = false
    })
    .catch(err => alert(err))
  }

  parseResponseCamada(data) {
    return data.filter(e => e.TIPO_BASE_VENDAS === "B")
  }

  goToSection() {
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
