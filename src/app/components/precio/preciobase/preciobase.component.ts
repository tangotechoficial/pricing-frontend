import { Component, OnInit } from "@angular/core";
import { CondicionService } from "../../../services/condicion.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  // tslint:disable-next-line: component-selector
  selector: "preciobase",
  templateUrl: "./preciobase.component.html",
  styleUrls: ["../../precio/precio.component.scss"],
  providers: [CondicionService, NgxSpinnerService]
})
export class PrecioBaseComponent implements OnInit {
  public sCurrentUser = JSON.parse(localStorage.getItem("User"));
  public bBusiness: boolean;

  camadas = [];
  isShow: boolean;
  existNegocios: any;
  existVentas: any;
  loading = true;
  public condicao: Array<any>;

  constructor(
    private condicionService: CondicionService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();

    /*
      Pablo Gerez 12/03/2020
      Gets type of user to validate
      which component will be shown
    */
    if (this.sCurrentUser.type !== "technical") {
      this.bBusiness = true;
    } else {
      this.bBusiness = false;
    }

    this.condicionService
      .getCondicaoCamadaByCamadaEsquema("B")
      .then(data => {
        this.camadas = data;
        this.spinner.hide();
      })
      .catch(err => {
        this.spinner.hide(); 
        alert(err)
      });
  }

  parseResponseCamada(data) {
    return data.filter(e => e.TIPO_BASE_VENDAS === "B");
  }

  goToSection() {
    this.isShow = !this.isShow;
  }

  parentListener($event) {
    this.existNegocios = $event;
  }

  parentListenerTwo($event) {
    this.existVentas = $event;
  }
}
