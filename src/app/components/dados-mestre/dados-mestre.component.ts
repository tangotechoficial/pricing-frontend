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

  constructor(
    private DadosMestresComposicaoPrecoService : DadosMestresComposicaoPrecoService,
    private DadosMestreVerba: DadosMestreVerbaService
  ) { }

  ngOnInit() {
  }

}
