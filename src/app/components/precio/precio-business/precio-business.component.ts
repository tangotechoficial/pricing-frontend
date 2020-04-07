import { Component, OnInit, Input } from '@angular/core';
import { EsquemasService } from 'app/services/esquemas.service';
import { Camada } from 'app/models/camadas';
import { CamadaService } from 'app/services/camada.service';
import { Sequencia } from 'app/models/sequencia';
import { Condicao } from 'app/models/condicao';
import { Campo } from 'app/models/campo';
import { SequenciaValues } from 'app/models/sequencia_values';
import { EsquemaCalculo } from '@app/models/esquemacalculo';
import { Mercadoria } from '@app/models/mercadoria';
import { FilialFaturamento } from '@app/models/filialfaturamento';
import { FilialExpedicao } from '@app/models/filialexpedicao';
import { Estado } from '@app/models/estado';
import { Regiao } from '@app/models/regiao';
import { ChavePrecificao } from '@app/models/chaveprecificao';
import { CondicionService } from '@app/services/condicion.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  public filialExpedicao: Array<FilialExpedicao>;
  public filialFaturamento: Array<FilialFaturamento>;
  public estado: Array<Estado>;
  public regiao: Array<Regiao>;
  public mercadoria: Array<Mercadoria>;
  public chavePrecificao: ChavePrecificao;
  public isLoading = false;
  public dataListPreencher: Array<any>;
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
  public esquema: EsquemaCalculo;
  public camadafullData: any;
  public condicaos: Condicao[];
  public condicaosAllow: any;
  public condicaosValues: any;
  public currentPrecoBase: any;
  public currentMargemCanal: any;
  public currentTotal: any;
  public precioType: any;

  constructor(
    private esquemaService: EsquemasService,
    private condicionService: CondicionService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.currentSelectedSequenciaValues = new Array<SequenciaValues>();
    this.camadaType = this.isVenta === 0 ? 'V' : 'B';
    this.chavePrecificao = new ChavePrecificao();
    this.updateMasterData();
    this.precioType = this.totalCondition();

  }
  totalCondition(){
    let indicator = this.isVenta
    if (indicator == 0){
      return "VENDAS";
    }else{
      return "BASE";
    }
  }

  onSelectCondicao(val: Condicao , camada: String , index:any) {
    this.currentSelectedCampos = null;
    this.selectedSequencia = null;
    this.currentSequencias = val.sequencias;
    this.selectItemColor(index , camada)


  }

  selectItemColor(item: number , cam:String) {
     $('p').removeClass('selectedTextItem');
     $('.' + cam).eq(item).addClass('selectedTextItem');
   }


  currVal(val) {
    let precobase = 0;
    let margemcanal = 0;
    const domCampo: any = document.getElementById(val.nome_campo);
    this.camadafullData.map(camada => {
      if (camada.camada.length !== 0) {
        if (camada.camada.nome_camada === 'PRECO_BASE') {
          precobase = camada.camada.value;
          this.currentPrecoBase = precobase;
        }
      }
    });

    if (val.nome_campo === 'PERMRGADICNLVND') {
      this.camadafullData.map(camada => {
        if (camada.camada.length !== 0) {
          if (camada.camada.nome_camada === 'MARGEM') {
            camada.condicaos.map(elem => {
              console.log(elem)
              if (elem.desc_condicao === 'MARGEM_CANAL') {
                elem.value = Math.floor(precobase * domCampo.innerHTML)/100;;
                margemcanal = elem.value;
                this.currentMargemCanal = margemcanal;
              }

            });
            camada.camada.value = margemcanal;
          }
        }
      });
    }
    this.currentTotal = this.currentPrecoBase + this.currentMargemCanal;
  }

  onSalvarEsquema() {
    this.spinnerService.show();
    const id = this.chavePrecificao.mercadoria.codprd.toString() +
      this.chavePrecificao.filialExpedicao.codfilemp.toString() +
      this.chavePrecificao.filialFaturamento.codfilempfat.toString() +
      this.chavePrecificao.regiao.tipedereg.toString() +
      this.chavePrecificao.regiao.codedereg.toString();
    this.esquemaService.postPreco(this.camadaType, id, 'EC001', this.currentTotal)
    .then(result => {
      this.spinnerService.hide();
      $('#myModal2').modal('show');
    });
  }

  public closePopUp() {
    $('#myModal2').modal('hide');
  }

  onAbrirChavePrecificao() {
    const id = this.chavePrecificao.mercadoria.codprd.toString() +
      this.chavePrecificao.filialExpedicao.codfilemp.toString() +
      this.chavePrecificao.filialFaturamento.codfilempfat.toString() +
      this.chavePrecificao.regiao.tipedereg.toString() +
      this.chavePrecificao.regiao.codedereg.toString();
    this.esquemaService.getPreco()
      .then(elem => {
        elem.map(preco => {
          if (preco.chave === id) {
            this.camadafullData.map(camada => {
              if (camada.camada.length !== 0) {
                if (camada.camada.nome_camada === 'PRECO_BASE') {
                  camada.camada.value = preco.valor;
                  this.precoBaseMaterial = preco.valor;
                }
              }
            });
          }
        });
      });
  }

  onSelectSequencia(val: Sequencia) {
    this.selectedSequencia = new Sequencia();
    this.selectedSequencia = val;
    this.currentSelectedCampos = new Array<Campo>();
    const nomeSequencia = val.nome_sequencia;
    const endpoint = nomeSequencia.replace(/\//g, '');
    this.esquemaService.getSequenciaValues(endpoint.toLowerCase())
      .then(result => {
        result.map(elem => {
          Object.keys(elem).forEach(key => {
            if (key !== 'id') {
              const campo = new Campo('', key.toUpperCase(), elem[key]);
              this.currentSelectedCampos.push(campo);
            }
          });
        });
      });
  }

  openPopUp(tp: string) {
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
    this.chavePrecificao.mercadoria = val;
  }

  getSelectedExpedicao(val: any) {
    this.chavePrecificao.filialExpedicao = val;
  }

  getSelectedFaturamento(val: any) {
    this.chavePrecificao.filialFaturamento = val;
  }

  getSelectedRegiao(val: any) {
    this.chavePrecificao.regiao = val;
  }

  onSelectEstado(val: any) {
    this.chavePrecificao.estado = val;
  }

  postPrecioBaseForMaterial() {

  }

  updateMasterData() {
    this.isLoading = true;
    this.filialExpedicao = new Array<FilialExpedicao>();
    this.filialFaturamento = new Array<FilialFaturamento>();
    this.estado = new Array<Estado>();
    this.regiao = new Array<Regiao>();
    this.mercadoria = new Array<Mercadoria>();
    this.camadas = new Array<Camada>();
    this.esquema = new EsquemaCalculo();
    Promise.all([
      this.esquemaService.getFilialExpedicao().then(fi => this.filialExpedicao = fi),
      this.esquemaService.getFilialFaturamento().then(fa => this.filialFaturamento = fa),
      this.condicionService.getCamadas().then(ca => this.camadas = ca),
      this.esquemaService.getEstado().then(es => this.estado = es),
      this.esquemaService.getRegiao().then(re => this.regiao = re),
      this.esquemaService.getMercadoria().then(mer => this.mercadoria = mer),
      this.esquemaService.fetchCondicaoCamadaEsquema(this.camadaType).then(data => this.camadafullData = data),
      this.esquemaService.getEsquemaCalculo(this.camadaType).then(result => {
        this.esquema = result;
      })
    ]).then(rs => {
      this.camadas = this.camadas.filter(obj => {
        return obj.tipo_base_vendas === this.camadaType;
      });
      this.isLoading = false;
      this.camadafullData.map(elem => {
        if (elem.condicaos.length !== 0) {
          elem.condicaos.map(co => {
            co.value = 0;
          });
        }
      });
    });
  }

  // getSelectedCondicao(val: any, i: any) {
  //   this.selectItemColor(i);
  // }

  // selectItemColor(item: number) {
  //   $('tr').removeClass('mySelect');
  //   $('tr').eq(item + 1).addClass('mySelect');
  // }


}

