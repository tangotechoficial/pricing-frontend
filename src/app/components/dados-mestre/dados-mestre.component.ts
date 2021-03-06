import { Component, OnInit, OnChanges, Input, SimpleChanges} from '@angular/core';
import { DadosMestresComposicaoPrecoService} from '../../services/dados-mestres-composicao-preco.service'
import { DadosMestreVerbaService} from '../../services/dados-mestre-verba.service'
import { PriceComposition } from '@models/pricecomposition';
import { MasterDataMoney } from '@models/masterdatamoney'
import { Filter } from '@models/filter'

declare var $: any;

@Component({
  selector: 'app-dados-mestre',
  templateUrl: './dados-mestre.component.html',
  styleUrls: ['./dados-mestre.component.scss'],
  providers: [ DadosMestresComposicaoPrecoService, DadosMestreVerbaService]
})
export class DadosMestreComponent implements OnChanges, OnInit{

  public masterDataPriceComposition: Array<any>;
  public masterDataMoney: Array<any>;
  dataFilter: Filter;
  changeLog: string[] = [];

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
            this.masterDataPriceComposition.push(new PriceComposition().deserialize(row));
          }
        ),
      err => console.log(err)
    )
    this.moneyService.dadosMestresVerba.subscribe(
      data =>
      data.results.map(
        row => {
          this.masterDataMoney.push(new MasterDataMoney().deserialize(row));
        }
      ),
      err => console.log(err)
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    // Listen for changes
  }

  getFilter(filter: Filter) {
    this.dataFilter = filter
  }



  showFilterModal() {
    $('#modalFilter').modal('show')
  }

}
