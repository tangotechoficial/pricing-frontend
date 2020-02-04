import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable()
export class MetadataService{

    public url: string;
    public _aSequenciaAcceso: Array<any>;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
        this._aSequenciaAcceso = ['Cliente', 'Material', 'Estado', 'Quantidade Vendas', 'Quantidade estoque', 'Transferencia', 'Test', 'Testing'];
    }

    public getMetadata(){
        return this._aSequenciaAcceso;
    }
}