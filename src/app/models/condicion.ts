import { element } from 'protractor';

export class Condicion {
    constructor(
        public sId: string = '',
        public sCodCondicion: string = '',
        public sDesCondicion: string = '',
        public aSequencias: Array<any> = new Array<any>(),
        public bEscalaQtde: boolean = false,
        public TIP_BASE_VENDAS: string = '',
        public bPos: boolean = false,
        public bNeg: boolean = false,
        public oTipoValor: any = null,
        public oChaveContas: any = null,
        public oCamada: any = null,
        public MANDATORIA: number = 0,
        public ESTATISTICA: number = 0
    ){}
    
    public setEscalaQtde(val){
        this.bEscalaQtde = val;
    }

    public getEscalaQtde(){
        return this.bEscalaQtde;
    }

    public setCodigo(codigo){
        this.sCodCondicion = codigo;
    }
    public getCodigo(){
        return this.sCodCondicion;
    }

    public setDescription(description){
        this.sDesCondicion = description;
    }

    public getDescription(){
        return this.sDesCondicion;
    }
}