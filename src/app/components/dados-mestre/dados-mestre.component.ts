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
    debugger
    let log: string[] = [];

    for (let propName in changes) {
      let changedProp = changes[propName];
      let to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      } else {
        let from = JSON.stringify(changedProp.previousValue);
        log.push(`${propName} changed from ${from} to ${to}`);
      }
    }
    this.changeLog.push(log.join(', '));

    console.log(this.changeLog)
  }

  getFilter(filter: Filter) {
    debugger
    this.dataFilter = filter
  }



  showFilterModal() {
    $('#modalFilter').modal('show')
  }

}
