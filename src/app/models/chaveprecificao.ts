import { Mercadoria } from './mercadoria';
import { FilialExpedicao } from './filialexpedicao';
import { FilialFaturamento } from './filialfaturamento';
import { Regiao } from './regiao';
import { Estado } from './estado';

export class ChavePrecificao {
    constructor(
        public mercadoria: Mercadoria = new Mercadoria('', '', '', '', '', '', '', '', '', '', '', ''),
        public filialExpedicao: FilialExpedicao = new FilialExpedicao('', ''),
        public filialFaturamento: FilialFaturamento = new FilialFaturamento('', ''),
        public regiao: Regiao = new Regiao('', '', ''),
        public estado: Estado = new Estado('', '')
    ) {}
}
