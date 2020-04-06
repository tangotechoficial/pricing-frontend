import { Condicao } from './condicao';
import { Camada } from './camadas';

export class EsquemaCalculo {
    constructor(
        public id = '',
        // tslint:disable-next-line: variable-name
        public cod_esquema_calculo = '',
        // tslint:disable-next-line: variable-name
        public tipo_base_vendas = '',
        // tslint:disable-next-line: variable-name
        public camadas = new Array<Camada>()
    ) {}
}
