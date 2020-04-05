import { Sequencia } from './sequencia';
import { Camada } from './camadas';
import { ChaveContas } from './chavecontas';
import { TipoValor } from './tipovalor';

export class Condicao {
    constructor(
        // tslint:disable-next-line: variable-name
        public cod_condicao: any = '',
        // tslint:disable-next-line: variable-name
        public desc_condicao: any = '',
        // tslint:disable-next-line: variable-name
        public escala_qtde: any = '',
        public pos_neg: any = 0,
        public tip_base_vendas: any = '',
        public mandatoria: any = '',
        public estatistica: any = '',
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
