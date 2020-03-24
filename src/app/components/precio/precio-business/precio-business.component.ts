import { Component, OnInit ,Input , Output } from '@angular/core';
import { EsquemasService } from 'app/services/esquemas.service';

declare var $: any;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'precio-business',
  templateUrl: './precio-business.component.html',
  styleUrls: ['../../precio/precio.component.scss']
})
// tslint:disable-next-line: component-class-suffix
export class PrecioBusiness implements OnInit {

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

  constructor(
    private esquemaService: EsquemasService
  ) {}

  ngOnInit() {

    this.updateMasterData();

    this.dataListPreencher = [{'idCliente':51 , 'tipo':'Consum Final' , 'valor':'$R30' , 'valdesd':'12/04/2019' , 'valate':'99/99/9999'},
    {'idCliente':52 , 'tipo':'Consum Final' , 'valor':'$R120' , 'valdesd':'12/04/2020' , 'valate':'99/99/9999'},
    {'idCliente':51 , 'tipo':'Consum Final' , 'valor':'$R320' , 'valdesd':'12/02/2019' , 'valate':'99/99/9999'},
    {'idCliente':51 , 'tipo':'Consum Final' , 'valor':'$R320' , 'valdesd':'12/02/2019' , 'valate':'99/99/9999'}

  ]
  }

  openPopUp(tp:string){
    if (tp == 'expedicao'){
      this.bSelectExpedicao = true;
    } else if(tp == 'material'){
      this.bSelectMaterial = true;
    } else if(tp == 'filial'){
      this.bSelectFacturamento = true;
    } else if(tp == 'regiao'){
      this.bSelectRegiao = true;
    }
  }

  closeOutput(val:any ,tp:string){
    if (tp == 'expedicao'){
      // alert("ex[erocap")
      this.bSelectExpedicao = false;
    } else if(tp == 'material'){
      this.bSelectMaterial = false;
    } else if(tp == 'filial'){
      this.bSelectFacturamento = false;
    } else if(tp == 'regiao'){
      this.bSelectRegiao = false;
    }
  }

  getSelectedMaterial(val: any) {
    console.log(val);
  }

  updateMasterData() {
    this.isLoading = true;
    this.filial = new Array<any>();
    this.faturamento = new Array<any>();
    this.estado = new Array<any>();
    this.region = new Array<any>();
    this.mercadoria = new Array<any>();
    Promise.all([
      this.esquemaService.getFilial().then(fi => fi.map(fiElem => this.filial.push(fiElem))),
      this.esquemaService.getFaturamento().then(fa => fa.map(faElem => this.faturamento.push(faElem))),
      this.esquemaService.getEstado().then(es => es.map(esElem => this.estado.push(esElem))),
      this.esquemaService.getRegion().then(re => re.map(reElem => this.region.push(reElem))),
      this.esquemaService.getMercadoria().then(mer => mer.map(merElem => this.mercadoria.push(merElem)))
    ]).then(rs => {
      this.isLoading = false;
      console.log(this.filial);
      console.log()
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

