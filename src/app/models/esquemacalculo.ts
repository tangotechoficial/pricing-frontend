import { Condicao } from './condicao';

export class EsquemaCalculo {
    constructor(
        // tslint:disable-next-line: variable-name
        public Cod_Esquema_Calculo = '',
        // tslint:disable-next-line: variable-name
        public Cod_Camada = '',
        // tslint:disable-next-line: variable-name
        public CONDICAO = new Array<Condicao>()
    ) {}
}
