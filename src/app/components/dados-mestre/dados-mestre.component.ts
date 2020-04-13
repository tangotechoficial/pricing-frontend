import { Component, OnInit, Input} from '@angular/core';
import { DadosMestresComposicaoPrecoService} from '../../services/dados-mestres-composicao-preco.service';
import { DadosMestreVerbaService} from '../../services/dados-mestre-verba.service';
import { PriceComposition } from '@models/pricecomposition';
import { MasterDataMoney } from '@models/masterdatamoney';
import { Filter } from '@models/filter';
import { FilterModalService } from '@services/filtermodal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Material } from '@models/material';

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
  submitted: boolean;
  loading = true;
  materials: Material[] = [];
  billBranches: any[] = [];

  constructor(
    private priceCompositionService: DadosMestresComposicaoPrecoService,
    private moneyService: DadosMestreVerbaService,
    private filterService: FilterModalService,
    private spinner: NgxSpinnerService
  ) {

    this.filter = this.filterService.currentFilterValue;
  }

  ngOnInit() {
    this.spinner.show()
    this.filterService.unsetFilter();
    this.masterDataPriceComposition = new Array<PriceComposition>();
    this.masterDataMoney = new Array<MasterDataMoney>();
    this.filterService.filterCurrent.subscribe(filter => this.filter = filter);
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
        this.loading = false;
        this.spinner.hide();
      }
    )

  }

  @Input() isSubmitted(value) {
    this.submitted = value;
  }

  @Input() setFilter(value) {
    this.filter = value;
  }

  showFilterModal() {
    $('#modalFilter').modal('show')
  }

}
