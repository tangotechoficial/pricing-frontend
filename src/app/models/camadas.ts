import { element } from 'protractor';
import { Condicion } from './condicion';
import { Condicao } from './condicao';

export class Camada {
    constructor(
        // tslint:disable-next-line: variable-name
        public cod_camada = '',
        // tslint:disable-next-line: variable-name
        public nome_camada = '',
        // tslint:disable-next-line: variable-name
        public tipo_base_vendas = '',
        public condicaos?: Array<Condicao>,
        public value?: any
    ) {}

    // tslint:disable-next-line: variable-name
    set(cod_camada: any, nome_camada: any, tipo_base_vendas: any, condicaos?: any) {
        this.cod_camada = cod_camada;
        this.nome_camada = nome_camada;
        this.tipo_base_vendas = tipo_base_vendas;
        this.condicaos = condicaos;
    }
}
