import { element } from 'protractor';
import { Condicion } from './condicion';
import { Condicao } from './condicao';

export class Camada {
    constructor(
        // tslint:disable-next-line: variable-name
        public Cod_Camada = '',
        // tslint:disable-next-line: variable-name
        public Nome_Camada = '',
        public TIPO_BASE_VENDAS = '',
        public condicaos?: Array<Condicao>
    ) {}

    // tslint:disable-next-line: variable-name
    set(Cod_Camada: any, Nome_Camada: any, TIPO_BASE_VENDAS: any, condicaos?: any) {
        this.Cod_Camada = Cod_Camada;
        this.Nome_Camada = Nome_Camada;
        this.TIPO_BASE_VENDAS = TIPO_BASE_VENDAS;
        this.condicaos = condicaos;
    }
}
