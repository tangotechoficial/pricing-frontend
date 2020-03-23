export class ModelCondicao {
  // tslint:disable-next-line: variable-name
  Cod_Condicao: any;
  // tslint:disable-next-line: variable-name
  Desc_Condicao: any;
  // tslint:disable-next-line: variable-name
  Escala_Qtde: any;
  POS_NEG: any;
  TIP_BASE_VENDAS: any;
  MANDATORIA: any;
  ESTATISTICA: any;
  // tslint:disable-next-line: variable-name
  Cod_Camada: any;
  // tslint:disable-next-line: variable-name
  Cod_ChaveContas: any;
  // tslint:disable-next-line: variable-name
  Cod_TipoValor: any;
  idCondicaoCamadaEsquema: any;
  Desc_TipoValor: any;

  constructor(obj) {
    this.Cod_Condicao = obj.Cod_Condicao;
    this.Desc_Condicao = obj.Desc_Condicao;
    this.Escala_Qtde = obj.Escala_Qtde;
    this.POS_NEG = obj.POS_NEG;
    this.TIP_BASE_VENDAS = obj.TIP_BASE_VENDAS;
    this.MANDATORIA = obj.MANDATORIA == "1" ? true : false;
    this.ESTATISTICA = obj.ESTATISTICA == "1" ? true : false;
    this.Cod_Camada = obj.Cod_Camada;
    this.Cod_ChaveContas = obj.Cod_ChaveContas;
    this.Cod_TipoValor = obj.Cod_TipoValor;
    this.idCondicaoCamadaEsquema = obj.idCondicaoCamadaEsquema;
    this.Desc_TipoValor = obj.Desc_TipoValor;
  }

  set(obj: any) {
    this.Cod_Condicao = obj.Cod_Condicao;
    this.Desc_Condicao = obj.Desc_Condicao;
    this.Escala_Qtde = obj.Escala_Qtde;
    this.POS_NEG = obj.POS_NEG;
    this.TIP_BASE_VENDAS = obj.TIP_BASE_VENDAS;
    this.MANDATORIA = obj.MANDATORIA == "1" ? true : false;
    this.ESTATISTICA = obj.ESTATISTICA == "1" ? true : false;
    this.Cod_Camada = obj.Cod_Camada;
    this.Cod_ChaveContas = obj.Cod_ChaveContas;
    this.Cod_TipoValor = obj.Cod_TipoValor;
    this.idCondicaoCamadaEsquema = obj.idCondicaoCamadaEsquema;
    this.Desc_TipoValor = obj.Desc_TipoValor;
  }
}

