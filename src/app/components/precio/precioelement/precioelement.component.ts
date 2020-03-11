import { Component, Input, Renderer2, ElementRef, OnInit } from "@angular/core";
import { CondicionService } from "../../../services/condicion.service";
import { ModelCondicao } from "../../../models/condicion.model";

interface IElement {
  id: number;
  codCondicao: number;
  desCondicao: String;
  typeValue: any;
  mandatoria: boolean;
  estadistica: boolean;
}

@Component({
  selector: "precio-element",
  templateUrl: "./precioelement.component.html",
  styleUrls: ["../../precio/precio.component.scss"],
  providers: [CondicionService]
})
export class PrecioElement implements OnInit {
  @Input() titulo: string;
  @Input() idCamada: string;
  condicaos: Array<ModelCondicao> = [];
  isEditNew = false;

  constructor(private _condicionService: CondicionService) {}

  ngOnInit() {
    //this.getDOMElement();
    // traer via servicio los elementos segun tipo
    this._condicionService
      .getCondicao()
      .then(data => {
        this.condicaos = data
          .filter(e => e.id_Camada == this.idCamada)
          .map(e => new ModelCondicao(e));
      })
      .catch(err => alert(err));
  }

  add() {
    console.log({ condicaos: this.condicaos });
    this.condicaos.push(new ModelCondicao({}));
    this.isEditNew = true;
  }

  remove(id) {
    // remove only in array
    this.condicaos = this.condicaos.filter(e => e.id != id);

    //remove from api
  }

  saveNew() {
    const newCondicao = this.condicaos.filter(e => e.id == undefined)[0];
    newCondicao.id_Camada = this.idCamada;
    newCondicao.MANDATORIA = newCondicao.MANDATORIA ? 1 : 0;
    newCondicao.ESTATISTICA = newCondicao.ESTATISTICA ? 1 : 0;
    
    newCondicao.Escala_Qtde = 1;
    newCondicao.POS_NEG = "P";
    newCondicao.TIP_BASE_VENDAS = "B";
    newCondicao.id_ChaveContas = 1
    

    console.log({ newCondicao });
    this._condicionService
      .postCondicaoTest(newCondicao)
      .then(data => console.log({ data }))
      .catch(err => alert(JSON.stringify(err)));
    this.isEditNew = false;
  }

  cancel() {
    this.condicaos = this.condicaos.filter(e => e.id != undefined);
    this.isEditNew = false;
  }
}
