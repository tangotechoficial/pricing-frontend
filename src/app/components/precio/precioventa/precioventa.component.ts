
import { Component, OnInit } from "@angular/core";
import { CondicionService } from "../../../services/condicion.service"

@Component({
  selector: "precioventa",
  templateUrl: "./precioventa.component.html",
  styleUrls: ["../../precio/precio.component.scss"],
  providers: [CondicionService]
})
export class PrecioVentaComponent implements OnInit {
  public sCurrentUser = JSON.parse(localStorage.getItem("User"));
  public bBusiness: boolean;

  camadas = [];
  isShow: boolean;
  existNegocios: any;
  existVentas: any;
  loading: boolean = true;
  
  constructor(
    private condicionService: CondicionService
  ) {}

  ngOnInit() {
    this.condicionService
      .getCondicaoCamadaByCamadaEsquema("V")
      .then(data => {
        this.camadas = data;
        this.loading = false
      })
      .catch(err => {
        this.loading = false
        alert(err)
      });
  }

  parseResponseCamada(data) {
    return data.filter(e => e.TIPO_BASE_VENDAS === "V")
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
