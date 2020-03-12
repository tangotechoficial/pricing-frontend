import { Component, Input } from "@angular/core";
import { CondicionService } from "../../../services/condicion.service";
import { ModelCondicao } from "app/models/condicion.model";

@Component({
  selector: "precio-technical",
  templateUrl: "./precio-technical.component.html",
  styleUrls: ["../../precio/precio.component.scss"],
  providers: [CondicionService]
})
export class PrecioTechnical {
  @Input() titulo: string;
  @Input() camada: any;

  condicaos: Array<ModelCondicao> = [];
  condicaosAllow: Array<ModelCondicao> = [];
  isEditNew: boolean = false
  loading: boolean = true
  modelCondicao: ModelCondicao;

  constructor(private _condicionService: CondicionService) {}

  ngOnInit() {
    const camadaEsquemas = this._condicionService.getCamadaEsquema();
    const condicaoCamadas = this._condicionService.getCondicaoCamada();
    const condicaos = this._condicionService.getCondicaoByCode();
    const promisesFetch = [camadaEsquemas, condicaoCamadas, condicaos];

    Promise.all(promisesFetch).then(
      ([camadaEsquemas, condicaoCamadas, condicaos]) => {

        let condicaoCamadasFilter = camadaEsquemas.map(camadaEsquema => {
          return condicaoCamadas.filter(
            condCamada => condCamada.id == camadaEsquema.id_Condicao_Camada
          )[0];
        });

        let condicaosFilter = condicaoCamadasFilter.map(condCamada => {
          return condicaos.filter(cond => cond.id == condCamada.id_Condicao)[0];
        });

        let condicaosByCamadaFilter = condicaosFilter.filter(cond => cond.id_Camada == this.camada.id)

        let condicaosAllow = condicaoCamadas.filter(condCam => condCam.id_Camada == this.camada.id).map(condCamada => {
          return condicaos.filter(cond => cond.id == condCamada.id_Condicao)[0];
        })

        this.condicaosAllow = condicaosAllow;
        this.condicaos = condicaosByCamadaFilter;
        this.loading = false
      }
    );
  }

  add() {
    this.modelCondicao = new ModelCondicao({})
    this.condicaos.push(this.modelCondicao);
    this.isEditNew = true;
  }

  cancel() {
    this.condicaos.pop() 
    this.isEditNew = false;
  }

  findCondicao() {
    const modelCondicaoFind = this.condicaosAllow.filter(cond => cond.Cod_Condicao == this.modelCondicao.Cod_Condicao)[0]
    if (modelCondicaoFind) {
      this.modelCondicao.set(modelCondicaoFind)
    } else {
      const condAll = this.condicaosAllow.map(e => e.Cod_Condicao).toString()
      const condMsgHelp = condAll.length > 0 ? condAll : "NO HAY CONDICION RELACIONADA CON LA CAMADA"
      const msg = `Cod Condicao "${this.modelCondicao.Cod_Condicao}" no esta cargado para esta camada. Probá con ${condMsgHelp}`
      alert(msg)
    }
    
  }
}
