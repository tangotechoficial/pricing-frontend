import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';


@Injectable()
export class MetadataService{

    public url: string;
    public _aSequenciaAcceso: Array<any>;
    public listaCondiciones: Array<any>;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
        this._aSequenciaAcceso = ['Cliente', 'Material', 'Estado', 'Quantidade Vendas', 'Quantidade estoque', 'Transferencia', 'Test', 'Testing'];
        this.listaCondiciones = ['Cliente/QuantidadeVendas', 'Cliente/Material/Estado', 'Material/QuantidadeEstoque', 'Material/Estado/Transferencia', 'Test', 'Testing'];
    }

    public getMetadataSeqAcceso(){
        return this._aSequenciaAcceso;
    }

    public getMetadataCondicion(){
        return this.listaCondiciones;
    }

    public searchData(value = ""){
        return this._aSequenciaAcceso.filter(elem => elem.toLowerCase().includes(value.toLowerCase())).slice(0,3);
    }

}