import { element } from 'protractor';

export class Condicion {
    constructor(
        public sId: string = '',
        public bClienteQuanVendas: boolean = false,
        public bClienteMaterialEstado: boolean = false,
        public bMaterialQuanEstoque: boolean = false,
        public bMaterialEstadoTransf: boolean = false,
        public bTest: boolean = false,
        public bTesting: boolean  = false
    ){}
}