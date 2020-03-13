import { Component, OnInit } from '@angular/core';
import { CondicionService } from '../../../services/condicion.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'preciobase',
  templateUrl: './preciobase.component.html',
  styleUrls: ['../../precio/precio.component.scss'],
  providers: [CondicionService]
})
export class PrecioBaseComponent implements OnInit {
  public sCurrentUser = JSON.parse(localStorage.getItem('User'));
  public bBusiness: boolean;

  camadas = [];
  isShow: boolean;
  existNegocios: any;
  existVentas: any;
  loading = true;

  constructor(
    private condicionService: CondicionService
  ) { }

  ngOnInit() {
    /*
      Pablo Gerez 12/03/2020
      Gets type of user to validate
      which component will be shown
    */
    if (this.sCurrentUser.type !== 'technical') {
      this.bBusiness = true;
    } else {
      this.bBusiness = false;
    }
    // traer por servicio cada condicion
    const camadas = this.condicionService.getCamadas();
    const camadaEsquemas = this.condicionService.getCamadaEsquema();
    const condicaoCamadas = this.condicionService.getCondicaoCamada();
    const condicaos = this.condicionService.getCondicaoByCode();
    const promisesFetch = [camadas, camadaEsquemas, condicaoCamadas, condicaos];

    Promise.all(promisesFetch).then(
      ([camadasRes, camadaEsquemasRes, condicaoCamadasRes, condicaosRes]) => {
        camadasRes = camadasRes.filter((e: any) => e.TIPO_BASE_VENDAS === 'B');
        const camadasFullData = camadasRes.map((camada: any) => {
          const condicaoCamadasFilter = camadaEsquemasRes.map((camadaEsquema: any) => {
            return condicaoCamadasRes.filter(
              (condCamada: any) => condCamada.id === camadaEsquema.id_Condicao_Camada
            )[0];
          });
          const condicaosFilter = condicaoCamadasFilter.map((condCamada: any) => {
            return condicaosRes.filter(cond => cond.id === condCamada.id_Condicao)[0];
          });
          const condicaosByCamadaFilter = condicaosFilter.filter((cond: any) => cond.id_Camada === camada.id);
          const condicaosAllow = condicaoCamadasRes.filter((condCam: any) => condCam.id_Camada === camada.id).map(condCamada => {
            return condicaosRes.filter((cond: any) => cond.id === condCamada.id_Condicao)[0];
          });

          this.loading = false;
          return {
            camada,
            condicaosAllow,
            condicaos: condicaosByCamadaFilter
          };
        });

        this.camadas = camadasFullData;
      }
    );
  }

  parseResponseCamada(data) {
    return data.filter(e => e.TIPO_BASE_VENDAS === 'B');
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
