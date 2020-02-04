import { element } from 'protractor';

export class Sacceso {
    constructor(
        public sId: string = '',
        public sSeqAcceso: string = 'SQ001',
        public sDesAcceso: string = '',
        public bCliente: boolean = false,
        public bMaterial: boolean = false,
        public bEstado: boolean = false,
        public bQVendas: boolean = false,
        public bQEstoque: boolean = false,
        public bTrasnferencia: boolean = false,
        public bTest: boolean = false,
        public bTesting: boolean  = false
    ){}
}