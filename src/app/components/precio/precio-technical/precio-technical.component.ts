import { Component, Input, Output } from "@angular/core";
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

  camadaU: any;
  condicaos: Array<ModelCondicao> = [];
  condicaosAllow: Array<ModelCondicao> = [];
  isEditNew = false;
  loading = true;
  modelCondicao: ModelCondicao;
  bSelectCondicao = false;
  globalIndex = 0;

  constructor() {}

  ngOnInit() {
    console.log(this.camada);
    this.condicaos = this.camada.condicaos;
    this.condicaosAllow = this.camada.condicaosAllow;
    this.camadaU = this.camada.camada;
  }

  add() {
    this.modelCondicao = new ModelCondicao({});
    this.globalIndex = this.condicaos.length;
    this.condicaos.push(this.modelCondicao);
    this.isEditNew = true;
  }

  cancel() {
    this.condicaos.pop();
  }
  onCloseCondicaoPopUp(val: any) {
    this.bSelectCondicao = val;
  }

  findCondicao(val: any) {
    
    this.bSelectCondicao = true;
    this.isEditNew = false;
    this.condicaos[this.globalIndex].set({
      id: val.sId,
      Cod_Condicao: val.sCodCondicion,
      Desc_Condicao: val.sDesCondicion,
      Escala_Qtde: val.bEscalaQtde,
      POS_NEG: val.sPos ? 'P' : 'N',
      TIP_BASE_VENDAS: val.TIP_BASE_VENDAS,
      MANDATORIA: val.MANDATORIA,
      ESTATISTICA: val.ESTATISTICA
    });
  }
}
