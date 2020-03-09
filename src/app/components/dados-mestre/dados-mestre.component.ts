import { Component, OnInit } from '@angular/core';
import { DadosMestresComposicaoPrecoService} from '../../services/dados-mestres-composicao-preco.service'
import { DadosMestreVerbaService} from '../../services/dados-mestre-verba.service'

@Component({
  selector: 'app-dados-mestre',
  templateUrl: './dados-mestre.component.html',
  styleUrls: ['./dados-mestre.component.scss'], 
  providers: [ DadosMestresComposicaoPrecoService, DadosMestreVerbaService ]
})
export class DadosMestreComponent implements OnInit {

  public dadosMestresComposicaoPreco: Array<any>;
  public dadosMestreVerba: Array<any>;

  constructor(
    private DadosMestresComposicaoPrecoService : DadosMestresComposicaoPrecoService,
    private DadosMestreVerba: DadosMestreVerbaService
  ) { }

  ngOnInit() {
    this.dadosMestresComposicaoPreco = new Array<any>();
    this.dadosMestreVerba = new Array<any>();
    this.DadosMestresComposicaoPrecoService.getDadosMestresPreco().subscribe(elem => elem.map(data => this.dadosMestresComposicaoPreco.push(data)))
    this.DadosMestreVerba.getDadosMestresVerba().subscribe(elem => elem.map(data => this.dadosMestreVerba.push(data)))
    console.log(this.dadosMestreVerba, this.dadosMestresComposicaoPreco)
  }
  // ngOnInit() {
  //   this.diretrizesEstrategicas = new Array<any>();
  //   this.DiretrizesEstrategicasService.getDistretriz().subscribe(elem => elem.map(data => this.diretrizesEstrategicas.push(data)));
  //   console.log(this.diretrizesEstrategicas);
  // }
}
