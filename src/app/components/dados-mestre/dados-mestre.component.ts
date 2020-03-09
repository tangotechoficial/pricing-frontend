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

  public masterDataPriceComposition: Array<any>;
  public masterDataMoney: Array<any>;

  constructor(
    private priceCompositionService : DadosMestresComposicaoPrecoService,
    private moneyService: DadosMestreVerbaService
  ) {
    this.masterDataPriceComposition = new Array<any>();
    this.masterDataMoney = new Array<any>();
  }

  ngOnInit() {
    this.priceCompositionService.dadosMestresPreco.subscribe(
      data =>
        data.results.map(
          row => {
            this.masterDataPriceComposition.push(row);
          }
        ),
      err => console.log(err)
    )
    this.moneyService.dadosMestresVerba.subscribe(
      data =>
      data.results.map(
        row => {
          //debuger 
          this.masterDataMoney.push(row);
        }
      ),
      err => console.log(err)
    )
  }

}
