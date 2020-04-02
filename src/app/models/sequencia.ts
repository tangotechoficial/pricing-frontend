import { Campo } from './campo';
import { SaccesoService } from 'app/services/sacceso.service';

export class Sequencia {

    constructor(
        // tslint:disable-next-line: variable-name
        public Cod_Sequencia: string = '',
        // tslint:disable-next-line: variable-name
        public Nome_Sequencia: string = '',
        public campos: Array<Campo> = new Array<Campo>()
    ) {}
}
