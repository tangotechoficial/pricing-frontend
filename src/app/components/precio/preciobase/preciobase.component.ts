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
    /*
    Pablo Gerez 12/03/2020
    Gets type of user to validate
    which component will be shown
  */
    if(this.sCurrentUser.type !== "technical"){
      this.bBusiness = true;
    }else{
      this.bBusiness = false;
    }
    // traer por servicio cada condicion
    this._condicionService.getCamadas()
    .then(data => {
      this.camadas = this.parseResponseCamada(data)
      this.loading = false
    })
    .catch(err => alert(err))

    
    const camadas =  this._condicionService.getCamadas()
    const camadaEsquemas = this._condicionService.getCamadaEsquema();
    const condicaoCamadas = this._condicionService.getCondicaoCamada();
    const condicaos = this._condicionService.getCondicaoByCode();
    const promisesFetch = [camadas, camadaEsquemas, condicaoCamadas, condicaos];

    Promise.all(promisesFetch).then(
      ([camadas, camadaEsquemas, condicaoCamadas, condicaos]) => {
        camadas = camadas.filter(e => e.TIPO_BASE_VENDAS === "B")
        const camadasFullData = camadas.map(camada => {
          let condicaoCamadasFilter = camadaEsquemas.map(camadaEsquema => {
            return condicaoCamadas.filter(
              condCamada => condCamada.id == camadaEsquema.id_Condicao_Camada
            )[0];
          });
  
          let condicaosFilter = condicaoCamadasFilter.map(condCamada => {
            return condicaos.filter(cond => cond.id == condCamada.id_Condicao)[0];
          });
  
          let condicaosByCamadaFilter = condicaosFilter.filter(cond => cond.id_Camada == camada.id)
  
          let condicaosAllow = condicaoCamadas.filter(condCam => condCam.id_Camada == camada.id).map(condCamada => {
            return condicaos.filter(cond => cond.id == condCamada.id_Condicao)[0];
          })
  
          
          return {
            camada,
            condicaosAllow,
            condicaos: condicaosByCamadaFilter
          }
        })

        this.camadas = camadasFullData
        // Mock data CAMADA_ESQUEMA
        // camadaEsquemas = [{
        //   id: 1,
        //   id_Condicao_Camada: 1,
        //   id_Esquema: 1
        // }]



        
      }
    );
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
