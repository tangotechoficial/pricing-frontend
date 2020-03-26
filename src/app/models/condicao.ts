
export class Condicao {
    constructor(
        // tslint:disable-next-line: variable-name
        public Cod_Condicao: any,
        // tslint:disable-next-line: variable-name
        public Desc_Condicao: any,
        // tslint:disable-next-line: variable-name
        public Escala_Qtde: any,
        public POS_NEG: any,
        public TIP_BASE_VENDAS: any,
        public MANDATORIA: any,
        public ESTATISTICA: any,
        // tslint:disable-next-line: variable-name
        public Cod_Camada: any,
        // tslint:disable-next-line: variable-name
        public Cod_ChaveContas: any,
        // tslint:disable-next-line: variable-name
        public Cod_TipoValor: any
    ) {}

    // tslint:disable-next-line: variable-name
    set(Cod_Condicao: any,
        // tslint:disable-next-line: variable-name
        Desc_Condicao: any,
        // tslint:disable-next-line: variable-name
        Escala_Qtde: any,
        POS_NEG: any,
        TIP_BASE_VENDAS: any,
        MANDATORIA?: any,
        ESTATISTICA?: any,
        // tslint:disable-next-line: variable-name
        Cod_Camada?: any,
        // tslint:disable-next-line: variable-name
        Cod_ChaveContas?: any,
        // tslint:disable-next-line: variable-name
        Cod_TipoValor?: any) {
        this.Cod_Condicao = Cod_Condicao;
        this.Desc_Condicao = Desc_Condicao;
        this.Escala_Qtde = Escala_Qtde;
        this.POS_NEG = POS_NEG;
        this.TIP_BASE_VENDAS = TIP_BASE_VENDAS;
        this.MANDATORIA = MANDATORIA;
        this.ESTATISTICA = ESTATISTICA;
        this.Cod_Camada = Cod_Camada;
        this.Cod_ChaveContas = Cod_ChaveContas;
        this.Cod_TipoValor = Cod_TipoValor;

    }
}
