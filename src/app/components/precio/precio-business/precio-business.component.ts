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
import { empty } from 'rxjs';
import { TipoValor } from '@app/models/tipovalor';

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
  public dinamicDomElems: Array<any>;
  public changes: Array<any>;
  public currentSequencia: any;
  public currentSequenciaModel: any;
  public currentSequenciaData: Array<any>;
  public currentColumnNames: Array<any>;
  public updatedIndexes: Array<any>;
  public sequenciasToUpdate: Array<any>;
  public sequenciaDataToUpdate: Array<any>;
  public newElementsIndex: Array<any>;
  public validationDescription: string;
  public validationTitle: string;

  tipovalor: TipoValor[];
  public currentCondicao: Condicao;

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
    this.sequenciasToUpdate = [];
    this.sequenciaDataToUpdate = [];
    this.newElementsIndex = [];

  }
  totalCondition() {
    const indicator = this.isVenta;
    if (indicator == 0) {
      return 'VENDAS';
    } else {
      return 'BASE';
    }
  }

  onSelectCondicao(val: Condicao, camada: String, index: any) {
    this.currentSelectedCampos = null;
    this.currentCondicao = new Condicao();
    this.currentCondicao = val;
    this.selectedSequencia = null;
    this.currentSequencias = val.sequencias;
    this.selectItemColor(index, camada);
  }

  selectItemColor(item: number, cam: String) {
    $('p').removeClass('selectedTextItem');
    $('.' + cam).eq(item).addClass('selectedTextItem');
  }

  onEnter($event) {
    $event.preventDefault();
  }

  onSalvarEsquema() {
    console.log('Estoy aca');
    if (this.sequenciasToUpdate.length === 0) {
      this.validationTitle = 'Informação - Nenhuma alteração detectada';
      this.validationDescription = 'Adicione ou modifique algum valor antes de salvar';
      $('#myModal2').modal('show');
    } else {
      this.esquemaService.postUpdatedSequenciaValues(this.sequenciasToUpdate, (res) => {
        this.validationTitle = 'Esquema de Cálculo';
        this.validationDescription = 'Esquema de Cálculo salva com sucesso!';
        if (res) {
          $('#myModal2').modal('show');
          this.sequenciasToUpdate = [];
        }
      });
    }
    /*     this.spinnerService.show();
        const id = this.chavePrecificao.mercadoria.codprd.toString() +
          this.chavePrecificao.filialExpedicao.codfilemp.toString() +
          this.chavePrecificao.filialFaturamento.codfilempfat.toString() +
          this.chavePrecificao.regiao.tipedereg.toString() +
          this.chavePrecificao.regiao.codedereg.toString();
        this.esquemaService.postPreco(this.camadaType, id, 'EC001', this.currentTotal)
          .then(result => {
            this.spinnerService.hide();
            $('#myModal2').modal('show');
          }); */
  }

  public closePopUp() {
    $('#myModal2').modal('hide');
  }

  onLimpiarChavePrecificao() {
    this.chavePrecificao = new ChavePrecificao();
  }

  onAbrirChavePrecificao() {
    const id = this.chavePrecificao.mercadoria.codprd.toString() +
      this.chavePrecificao.filialExpedicao.codfilemp.toString() +
      this.chavePrecificao.filialFaturamento.codfilempfat.toString() +
      this.chavePrecificao.regiao.tipedereg.toString() +
      this.chavePrecificao.regiao.codedereg.toString();
    if ((this.chavePrecificao.mercadoria.codprd.toString() === '') ||
      (this.chavePrecificao.filialExpedicao.codfilemp.toString() === '') ||
      (this.chavePrecificao.filialFaturamento.codfilempfat === '') ||
      (this.chavePrecificao.regiao.tipedereg.toString() === '') ||
      (this.chavePrecificao.regiao.codedereg.toString() === '')) {
      this.validationTitle = 'Chave de preço incompleta';
      this.validationDescription = 'Por favor, preencha os campos da chave de preço';
      $('#myModal2').modal('show');
    } else {
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


  }

  getModelStructure(val: any) {
    const obj = {};
    const properties = Object.getOwnPropertyNames(val);
    properties.map(props => obj[props.toLowerCase()] = '');
    return obj;
  }

  getColumnNamesHTML(val: any) {
    const arr = [];
    const startTh = `<th>`;
    const endTh = `<th>`;
    const obj = {};
    const properties = Object.getOwnPropertyNames(val);
    properties.map(props => {
      let currentCol = ``;
      currentCol = startTh + props.toUpperCase() + endTh;
      arr.push(currentCol);
    });
    return arr;
  }

  getRowDataHTML(val: any) {
    const arr = [];
    const objProps = [];
    const valor = `" `;
    // tslint:disable-next-line: forin
    for (const key in val) {
      if (val.hasOwnProperty(key)) {
        const row = `<td>` + val[key] + `</td>`;
        arr.push(row);
      }
    }
    return arr;
  }

  createEmptyRowDataHTML() {
    const emptyModel: any = this.currentSequenciaModel;
    emptyModel.isNew = true;
    const lastIndex = this.currentSequenciaData[this.currentSequenciaData.length - 1].row + 1;
    if (this.newElementsIndex.find(elem => elem.sequencia === this.currentSequencia)) {
      const index = this.newElementsIndex.findIndex(elem => elem.sequencia === this.currentSequencia);
      if (!this.newElementsIndex[index].data.includes(lastIndex)) {
        this.newElementsIndex[index].data.push(lastIndex);
      }
    } else {
      const array = [];
      array.push(lastIndex);
      this.newElementsIndex.push({ sequencia: this.currentSequencia, data: array });
    }
    const arr = [];
    for (const key in emptyModel) {
      if (emptyModel.hasOwnProperty(key) && key !== 'isNew') {
        const row = `<td></td>`;
        arr.push(row);
      }
    }
    this.currentSequenciaData.push({ row: lastIndex, data: arr });
  }

  parseHTMLtoJSON(val: any) {
    const props = Object.getOwnPropertyNames(this.currentSequenciaModel);
    const currObjectModel = {};
    props.map(elem => {
      currObjectModel[elem] = '';
    });
    const keys = Object.keys(currObjectModel);
    keys.map((key, index) => {
      if (key !== 'isNew') {
        const arrValue = val.cells[index].innerHTML;
        currObjectModel[key] = arrValue;
      }
    });
    return currObjectModel;
  }

  parseCurrentObjectToJSON(val: any) {
    const props = Object.getOwnPropertyNames(this.currentSequenciaModel);
    const currObjectModel = {};
    props.map(elem => {
      currObjectModel[elem] = '';
    });
    const keys = Object.keys(currObjectModel);
    keys.map((key, index) => {
      if (key !== 'isNew') {
        const elem = document.createElement('tr');
        elem.innerHTML = val[index];
        currObjectModel[key] = elem.cells[0].innerHTML;
      }
    });
    return currObjectModel;
  }

  areEquals(a, b) {
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);
    let aPropsLength = 0;
    let bPropsLength = 0;

    aProps.map(elem => {
      if (elem !== 'isNew') {
        aPropsLength = aPropsLength + 1;
      }
    });

    bProps.map(elem => {
      if (elem !== 'isNew') {
        bPropsLength = bPropsLength + 1;
      }
    });

    if (aPropsLength !== bPropsLength) {
      return false;
    }

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < aPropsLength; i++) {
      const propName = aProps[i];
      if (a[propName] !== b[propName]) {
        return false;
      }
    }
    return true;
  }

  public elemExist(obj, list) {
    for (const row of list) {
      if (row === obj) {
        return true;
      }
    }
    return false;
  }

  checkIfRowHasChanges(val: any) {
    const currentRow: any = document.getElementById('row' + val.row);
    const fromDBRow: any = this.parseCurrentObjectToJSON(val.data);
    const currHTMLObject = this.parseHTMLtoJSON(currentRow);
    if (!this.areEquals(fromDBRow, currHTMLObject)) {
      // Creo un objecto de con la secuencia seleccionada y el objeto generado
      const obj: any = { sequencia: this.currentSequencia, data: [] };
      obj.data[val.row] = currHTMLObject;
      // Busco en el array si existe el objeto
      const index = this.sequenciasToUpdate.findIndex(elem => elem.sequencia === this.currentSequencia);
      // Compruebo si la sequencia existe en el array
      if (index !== -1) {
        // Si la sequencia existe
        this.sequenciasToUpdate[index].data[val.row] = currHTMLObject;
      } else {
        this.sequenciasToUpdate.push(obj);
      }
    }
    const currSequenciaIndex = this.sequenciasToUpdate.findIndex(elem => elem.sequencia === this.currentSequencia);
    const newElemSequenciaIndex = this.newElementsIndex.findIndex(elem => elem.sequencia === this.currentSequencia);
    this.newElementsIndex[newElemSequenciaIndex].data.map(ind => {
      console.log(ind);
      console.log(currHTMLObject);
      console.log(this.sequenciasToUpdate[currSequenciaIndex].data[ind]);
      this.sequenciasToUpdate[currSequenciaIndex].data[ind].isNew = true;
    });
  }

  checkIfCondicaoWasSelected() {
    console.log(this.currentCondicao);
    if (this.currentCondicao === undefined) {
      this.validationTitle = 'Condição';
      this.validationDescription = 'Selecione uma condição';
      $('#myModal2').modal('show');
    }
  }

  onSelectSequencia(val: Sequencia) {
    if (this.currentSequencia) {
      const objData = { sequencia: this.currentSequencia, data: this.currentSequenciaData };
      if (this.sequenciaDataToUpdate.find(elem => elem.sequencia === this.currentSequencia)) {
        const index = this.sequenciaDataToUpdate.findIndex(elem => elem.sequencia === this.currentSequencia);
        this.sequenciaDataToUpdate[index] = objData;
      } else {
        this.sequenciaDataToUpdate.push(objData);
      }
    }
    this.currentColumnNames = [];
    this.currentSequenciaData = [];
    this.selectedSequencia = new Sequencia();
    this.selectedSequencia = val;
    this.currentSelectedCampos = new Array<Campo>();
    const nomeSequencia = val.nome_sequencia;
    const endpoint = nomeSequencia.replace(/\//g, '');
    this.currentSequencia = endpoint.toLocaleLowerCase();
    if (this.sequenciaDataToUpdate.find(elem => elem.sequencia === endpoint)) {
      const index = this.sequenciaDataToUpdate.findIndex(elem => elem.sequencia === endpoint);
      this.currentSequenciaData = this.sequenciaDataToUpdate[index].data;
      console.log(this.sequenciaDataToUpdate[index].data);
    } else {
      this.esquemaService.getSequenciaValues(endpoint.toLowerCase())
        .then(result => {
          result.map((elem, index) => {

            // Obtains model structure
            const estructura = this.getModelStructure(elem);

            // Save Current Model
            this.currentSequenciaModel = estructura;

            // Get Column Names
            this.currentColumnNames = this.getColumnNamesHTML(elem);

            // Get Row Data
            this.currentSequenciaData.push({ row: index, data: this.getRowDataHTML(elem) });

          });
        });
    }
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
    this.tipovalor = new Array<TipoValor>();
    Promise.all([
      this.esquemaService.getFilialExpedicao().then(fi => this.filialExpedicao = fi),
      this.esquemaService.getFilialFaturamento().then(fa => this.filialFaturamento = fa),
      this.condicionService.getCamadas().then(ca => this.camadas = ca),
      this.esquemaService.getEstado().then(es => this.estado = es),
      this.esquemaService.getRegiao().then(re => this.regiao = re),
      this.condicionService.getTiposValor().then(tp => this.tipovalor = tp),
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
      this.camadafullData.map(elem => {
        elem.condicaos.map(cond => {
          const tipovalor = this.tipovalor.find(tipo => tipo.cod_tipovalor === cond.cod_tipovalor);
          cond.tipovalor = tipovalor;
        });
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

