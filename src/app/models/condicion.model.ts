export class ModelCondicao {
  
    id: any;
    Cod_Condicao: any;
    Desc_Condicao: any;
    Escala_Qtde: any;
    POS_NEG: any;
    TIP_BASE_VENDAS: any;
    MANDATORIA: any;
    ESTATISTICA: any;
    id_Camada: any;
    id_ChaveContas: any;
    id_TipoValor: any;
  
    constructor(obj) {
      this.id = obj.id;
      this.Cod_Condicao = obj.Cod_Condicao;
      this.Desc_Condicao = obj.Desc_Condicao;
      this.Escala_Qtde = obj.Escala_Qtde;
      this.POS_NEG = obj.POS_NEG;
      this.TIP_BASE_VENDAS = obj.TIP_BASE_VENDAS;
      this.MANDATORIA = obj.MANDATORIA == "1" ? true : false;
      this.ESTATISTICA = obj.ESTATISTICA == "1" ? true : false;
      this.id_Camada = obj.id_Camada;
      this.id_ChaveContas = obj.id_ChaveContas;
      this.id_TipoValor = obj.id_TipoValor;
    }

    set(obj) {
      this.id = obj.id;
      this.Cod_Condicao = obj.Cod_Condicao;
      this.Desc_Condicao = obj.Desc_Condicao;
      this.Escala_Qtde = obj.Escala_Qtde;
      this.POS_NEG = obj.POS_NEG;
      this.TIP_BASE_VENDAS = obj.TIP_BASE_VENDAS;
      this.MANDATORIA = obj.MANDATORIA == "1" ? true : false;
      this.ESTATISTICA = obj.ESTATISTICA == "1" ? true : false;
      this.id_Camada = obj.id_Camada;
      this.id_ChaveContas = obj.id_ChaveContas;
      this.id_TipoValor = obj.id_TipoValor;
    }
  }