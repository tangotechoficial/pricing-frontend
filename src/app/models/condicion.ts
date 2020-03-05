import { element } from 'protractor';

export class Condicion {
    constructor(
        public sId: string = '',
        public sCodCondicion: string = '',
        public sDesCondicion: string = '',
        public _parents: Array<any> = new Array<any>(),
        public selected: boolean = false
    ){}
    
    public setSelected(val){
        this.selected = val;
    }

    public isSelected(){
        return this.selected;
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