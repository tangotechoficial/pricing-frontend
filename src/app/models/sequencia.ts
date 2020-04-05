import { Campo } from './campo';
import { SaccesoService } from 'app/services/sacceso.service';

export class Sequencia {

    constructor(
        // tslint:disable-next-line: variable-name
        public cod_sequencia: string = '',
        // tslint:disable-next-line: variable-name
        public nome_sequencia: string = '',
        public campos: Array<Campo> = new Array<Campo>()
    ) {}
}
