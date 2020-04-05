export class ModelCondicao {
  // tslint:disable-next-line: variable-name
  cod_condicao: any;
  // tslint:disable-next-line: variable-name
  desc_condicao: any;
  // tslint:disable-next-line: variable-name
  escala_qtde: any;
  pos_neg: any;
  tip_base_vendas: any;
  mandatoria: any;
  estatistica: any;
  // tslint:disable-next-line: variable-name
  cod_camada: any;
  // tslint:disable-next-line: variable-name
  cod_chavecontas: any;
  // tslint:disable-next-line: variable-name
  cod_tipovalor: any;
  idCondicaoCamadaEsquema: any;
  desc_tipovalor: any;
  sequencias: any;

  constructor(obj) {
    this.cod_condicao = obj.cod_condicao;
    this.desc_condicao = obj.desc_condicao;
    this.escala_qtde = obj.escala_qtde;
    this.pos_neg = obj.pos_neg;
    this.tip_base_vendas = obj.tip_base_vendas;
    this.mandatoria = obj.mandatoria == "1" ? true : false;
    this.estadistica = obj.estadistica == "1" ? true : false;
    this.cod_camada = obj.cod_camada;
    this.cod_chavecontas = obj.cod_chavecontas;
    this.cod_tipovalor = obj.cod_tipovalor;
    this.idCondicaoCamadaEsquema = obj.idCondicaoCamadaEsquema;
    this.desc_tipovalor = obj.desc_tipovalor;
    this.sequencias = obj.sequencias
  }

  set(obj: any) {
    this.cod_condicao = obj.cod_condicao;
    this.desc_condicao = obj.desc_condicao;
    this.escala_qtde = obj.escala_qtde;
    this.pos_neg = obj.pos_neg;
    this.tip_base_vendas = obj.tip_base_vendas;
    this.mandatoria = obj.mandatoria == "1" ? true : false;
    this.estadistica = obj.estadistica == "1" ? true : false;
    this.cod_camada = obj.cod_camada;
    this.cod_chavecontas = obj.cod_chavecontas;
    this.cod_tipovalor = obj.cod_tipovalor;
    this.idCondicaoCamadaEsquema = obj.idCondicaoCamadaEsquema;
    this.desc_tipovalor = obj.desc_tipovalor;
    this.sequencias = obj.sequencias
  }
}

