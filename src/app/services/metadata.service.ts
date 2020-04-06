import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Sacceso } from '@models/sacceso';
import { environment } from '@env/environment';

@Injectable()
export class MetadataService{

    public url: string;
    public _aSequenciaAcceso: Array<any>;
    public _aSequenciaAccesos: Array<any>;
    public listaCondiciones: Array<any>;
    public _sacceso: Sacceso;

    constructor(
        private _http: HttpClient
    ){
        this.url = `${environment.apiUrl}/dinamica`;
        this._aSequenciaAcceso = ['Cliente', 'Material', 'Estado', 'Quantidade Vendas', 'Quantidade estoque', 'Transferencia', 'Test', 'Testing'];
        this._aSequenciaAccesos = new Array<any>();
        this.listaCondiciones = ['Cliente/QuantidadeVendas', 'Cliente/Material/Estado', 'Material/QuantidadeEstoque', 'Material/Estado/Transferencia', 'Test', 'Testing'];
    }

    public getMetadataSeqAcceso(){
        return this._aSequenciaAccesos;
    }

    public getMetadataCondicion(){
        return this.listaCondiciones;
    }

    public searchData(value = ""){
        return this._aSequenciaAcceso.filter(elem => elem.toLowerCase().includes(value.toLowerCase())).slice(0,3);
    }

    public saveNewSequence(codigo, descripcion){
        this._sacceso = new Sacceso();
        this._sacceso.setCodigo(codigo);
        this._sacceso.setDescription(descripcion);
        this._aSequenciaAccesos.push(this._sacceso);
        console.log(this._aSequenciaAccesos);
    }

}
