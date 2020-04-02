import { Sequencia } from './sequencia';
import { Camada } from './camadas';
import { ChaveContas } from './chavecontas';
import { TipoValor } from './tipovalor';

export class Condicao {
    constructor(
        // tslint:disable-next-line: variable-name
        public Cod_Condicao: any = '',
        // tslint:disable-next-line: variable-name
        public Desc_Condicao: any = '',
        // tslint:disable-next-line: variable-name
        public Escala_Qtde: any = '',
        public POS_NEG: any = 0,
        public TIP_BASE_VENDAS: any = '',
        public MANDATORIA: any = '',
        public ESTATISTICA: any = '',
        // tslint:disable-next-line: variable-name
        public camada: Camada = new Camada(),
        // tslint:disable-next-line: variable-name
        public chavecontas: ChaveContas = new ChaveContas(),
        // tslint:disable-next-line: variable-name
        public tipovalor: TipoValor = new TipoValor(),
        public value: any = '',
        public sequencias: Array<Sequencia> = new Array<Sequencia>()
    ) {}
}
