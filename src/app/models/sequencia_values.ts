import { Campo } from './campo';

export class SequenciaValues {
    constructor(
        // tslint:disable-next-line: variable-name
        public Cod_sequencia = '',
        // tslint:disable-next-line: variable-name
        public Nome_Sequencia = '',
        public camposValue = new Array<Campo>()
    ) {}
}
