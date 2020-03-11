import { Component, Input } from "@angular/core";
import { CondicionService } from "../../../services/condicion.service";

@Component({
  selector: "precio-technical",
  templateUrl: "./precio-technical.component.html",
  styleUrls: ["../../precio/precio.component.scss"],
  providers: [CondicionService]
})
export class PrecioTechnical {
  @Input() titulo: string;
  @Input() camada: any;

  condicaos = []

  constructor(private _condicionService: CondicionService) {}

  
  async ngOnInit() {
    
    let condicaoCamadas = await this._condicionService.getCondicaoCamada()
    condicaoCamadas = condicaoCamadas.filter(condCam => condCam.id_Camada == this.camada.id)
    
    let condicaos = await this._condicionService.getCondicaoByCode()
    this.condicaos = condicaoCamadas.map(condCam => {
      return condicaos.filter(condicao => condicao.id == condCam.id_Condicao)[0]
    })
     


  }
}
