import { Component, OnInit ,Input , Output } from '@angular/core';
import { EsquemasService } from 'app/services/esquemas.service';
import { Camada } from 'app/models/camadas';
import { CamadaService } from 'app/services/camada.service';
import { Sequencia } from 'app/models/sequencia';
import { Condicao } from 'app/models/condicao';
import { Condicion } from 'app/models/condicion';
import { Campo } from 'app/models/campo';
import { SequenciaValues } from 'app/models/sequencia_values';

declare var $: any;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'precio-business',
  templateUrl: './precio-business.component.html',
  styleUrls: ['../../precio/precio.component.scss']
})
// tslint:disable-next-line: component-class-suffix
export class PrecioBusiness implements OnInit {
  @Input() isVenta: any;
  public sequencias;
  public selectedSequencia;
  public filial: Array<any>;
  public faturamento: Array<any>;
  public estado: Array<any>;
  public region: Array<any>;
  public mercadoria: Array<any>;
  public isLoading = false;
  public dataListPreencher: Array <any>;
  public bSelectMaterial = false;
  public bSelectExpedicao = false;
  public bSelectFacturamento = false;
  public bSelectRegiao = false;
  public expedicao: boolean;
  public precoBaseMaterial: any;
  public camadas: Array<Camada>;
  public camadaType: any;
  public currentSequencias: Array<Sequencia>;
  public currentSelectedCampos: Array<Campo>;
  public currentSelectedSequenciaValues: Array<SequenciaValues>;

  constructor(
    private esquemaService: EsquemasService,
    private camadaService: CamadaService
  ) {}

  ngOnInit() {
    this.currentSelectedSequenciaValues = new Array<SequenciaValues>();
    this.camadaType = this.isVenta === 0 ? 'V' : 'B';
    this.precoBaseMaterial = {
      material: { CODPRD: '',
                  DESPRD: '',
                  CODGRPPRD: '',
                  CODCLSPRD: '',
                  DESCLSPRD: '',
                  CODSUBCTGPRD: '',
                  DESSUBCTGPRD: '',
                  CODSMR: '',
                  DESSMR: ''},
      filialExpedicao: {
        Cod_Filial: '',
        Desc_Filial: ''
      },
      filialFaturamento: {
        Cod_Faturamento: '',
        Desc_Faturamento: ''
      },
      estado: {
        Cod_Estado: 'SP',
        Desc_Estado: ''
      },
      regiaoPreco: {
        Cod_Region: '',
        Tipo_Region: '',
        Desc_Region: ''
      }
    };

    this.updateMasterData();

    this.dataListPreencher = [{'idCliente':51 , 'tipo':'Consum Final' , 'valor':'$R30' , 'valdesd':'12/04/2019' , 'valate':'99/99/9999'},
    {'idCliente':52 , 'tipo':'Consum Final' , 'valor':'$R120' , 'valdesd':'12/04/2020' , 'valate':'99/99/9999'},
    {'idCliente':51 , 'tipo':'Consum Final' , 'valor':'$R320' , 'valdesd':'12/02/2019' , 'valate':'99/99/9999'},
    {'idCliente':51 , 'tipo':'Consum Final' , 'valor':'$R320' , 'valdesd':'12/02/2019' , 'valate':'99/99/9999'}

  ]
  }

  onSelectCondicao(val: Condicao) {
    this.currentSelectedCampos = null;
    this.selectedSequencia = null;
    this.currentSequencias = val.sequencias;
  }

  currVal(val) {
    console.log(val);
  }

  onSelectSequencia(val: Sequencia) {
    this.selectedSequencia = new Sequencia();
    this.selectedSequencia = val;
    this.currentSelectedCampos = new Array<Campo>();
    val.campos.map(elem => this.currentSelectedCampos.push(elem));
    this.currentSelectedCampos.push({Cod_Campo: 'CPVAL', Nome_Campo: 'VALUE', Value: ''});
    const sequenciavalue: SequenciaValues = new SequenciaValues(val.Cod_sequencia, val.Nome_sequencia, this.currentSelectedCampos);
    sequenciavalue.camposValue.map(elem => elem.Value = '');
    this.currentSelectedSequenciaValues.push(sequenciavalue);
  }

  openPopUp(tp: string){
    if (tp === 'expedicao') {
      this.bSelectExpedicao = true;
    } else if (tp === 'material') {
      this.bSelectMaterial = true;
    } else if (tp === 'filial') {
      this.bSelectFacturamento = true;
    } else if (tp === 'regiao') {
      this.bSelectRegiao = true;
    }
  }

  closeOutput(val: any, tp: string) {
    if (tp === 'expedicao') {
      this.bSelectExpedicao = false;
    } else if (tp === 'material') {
      this.bSelectMaterial = false;
    } else if (tp === 'filial') {
      this.bSelectFacturamento = false;
    } else if (tp === 'regiao') {
      this.bSelectRegiao = false;
    }
  }

  getSelectedMaterial(val: any) {
    this.precoBaseMaterial.material = val;
  }

  getSelectedExpedicao(val: any) {
    this.precoBaseMaterial.filialExpedicao = val;
  }

  getSelectedFaturamento(val: any) {
    this.precoBaseMaterial.filialFaturamento = val;
  }

  getSelectedRegiao(val: any) {
    this.precoBaseMaterial.regiaoPreco = val;
  }

  onSelectEstado(val: any) {
    this.precoBaseMaterial.estado = val;
  }

  postPrecioBaseForMaterial() {

  }

  updateMasterData() {
    this.isLoading = true;
    this.filial = new Array<any>();
    this.faturamento = new Array<any>();
    this.estado = new Array<any>();
    this.region = new Array<any>();
    this.mercadoria = new Array<any>();
    this.camadas = new Array<Camada>();
    Promise.all([
      this.esquemaService.getFilial().then(fi => fi.map(fiElem => this.filial.push(fiElem))),
      this.esquemaService.getFaturamento().then(fa => fa.map(faElem => this.faturamento.push(faElem))),
      this.esquemaService.getEstado().then(es => es.map(esElem => this.estado.push(esElem))),
      this.esquemaService.getRegion().then(re => re.map(reElem => this.region.push(reElem))),
      this.esquemaService.getMercadoria().then(mer => mer.map(merElem => this.mercadoria.push(merElem))),
      this.camadaService.getCamadasByType(this.camadaType).then(cam => cam.map(camElem => this.camadas.push(camElem)))
    ]).then(rs => {
      this.isLoading = false;
      console.log(this.camadas)
    });
  }

  getSelectedCondicao(val: any , i: any) {
    this.selectItemColor(i);
  }

  selectItemColor(item: number) {
    $('tr').removeClass('mySelect');
    $('tr').eq(item + 1).addClass('mySelect');
   }


}

