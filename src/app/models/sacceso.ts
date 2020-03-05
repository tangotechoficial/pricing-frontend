import { element } from 'protractor';

export class Sacceso {
    constructor(
        public sId: string = '',
        public sSeqAcceso: string = '',
        public sDesAcceso: string = '',
        public _parents: Array<any> = new Array<any>(),
        public selected: boolean = false
    ){}


    public setId(val){
        this.sId = val;
    }

    public getId(){
        return this.sId;
    }
    
    public setSelected(val){
        this.selected = val;
    }

    public isSelected(){
        return this.selected;
    }

    public setCodigo(codigo){
        this.sSeqAcceso = codigo;
    }
    public getCodigo(){
        return this.sSeqAcceso;
    }

    public setDescription(description){
        this.sDesAcceso = description;
    }

    public getDescription(){
        return this.sDesAcceso;
    }
}