import { Component, OnInit, Input, Output} from '@angular/core';
import { DadosMestresComposicaoPrecoService} from '../../services/dados-mestres-composicao-preco.service'
import { DadosMestreVerbaService} from '../../services/dados-mestre-verba.service'
import { PriceComposition } from '@models/pricecomposition';
import { MasterDataMoney } from '@models/masterdatamoney'
import { Filter } from '@models/filter'
import { FilterModalService } from '@services/filtermodal.service'
import { NgxSpinnerService } from 'ngx-spinner'
import { Material } from '@models/material'

declare var $: any;

@Component({
  selector: 'app-dados-mestre',
  templateUrl: './dados-mestre.component.html',
  styleUrls: ['./dados-mestre.component.scss'],
  providers: [ DadosMestresComposicaoPrecoService, DadosMestreVerbaService, NgxSpinnerService]
})
export class DadosMestreComponent implements OnInit{

  public masterDataPriceComposition: Array<PriceComposition>;
  public masterDataMoney: Array<any>;
  filter: Filter;
  submitted: boolean
  loading: boolean = true;
  materials: Material[] = []
  billBranches: any[] = []

  constructor(
    private priceCompositionService : DadosMestresComposicaoPrecoService,
    private moneyService: DadosMestreVerbaService,
    private filterService: FilterModalService,
    private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit() {
    this.spinner.show()
    this.masterDataPriceComposition = new Array<PriceComposition>();
    this.masterDataMoney = new Array<MasterDataMoney>();
    Promise.all([
      this.priceCompositionService.dadosMestresPreco.then(
        data =>
          data.map(
            row => {
              this.masterDataPriceComposition.push(new PriceComposition().deserialize(row));
            }
          )
      ),
      this.moneyService.dadosMestresVerba.then(
        data =>
        data.map(
          row => {
            this.masterDataMoney.push(new MasterDataMoney().deserialize(row));
          }
        ),
        err => console.log(err)
      ),
    ]).then(
      result => {
        this.loading = false
        this.spinner.hide()
      }
    )

  }

  @Input() isSubmitted(value) {
    this.submitted = value
  }

  @Input() setFilter(value) {
    this.filter = value
    console.log(value)
  }

  showFilterModal() {
    $('#modalFilter').modal('show')
  }

}
