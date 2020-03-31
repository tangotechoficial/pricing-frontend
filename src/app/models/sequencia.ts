import { Campo } from './campo';
import { SaccesoService } from 'app/services/sacceso.service';

export class Sequencia {

    constructor(
        // tslint:disable-next-line: variable-name
        public Cod_sequencia: string = '',
        // tslint:disable-next-line: variable-name
        public Nome_sequencia: string = '',
        public campos: Array<Campo> = new Array<Campo>()
    ) {}
}
