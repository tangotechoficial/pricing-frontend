import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from './global';
import { CondicionService } from './condicion.service';

@Injectable()
export class EsquemasService {

    public url: string;
    public condicion: Array<any>;
    constructor(
        private http: HttpClient,
        private condicionService: CondicionService
    ) {
        this.url = Global.url;
    }

    postEsquema(obj: any): Promise<any> {
        // tslint:disable-next-line: max-line-length
        return this.http.post(this.url + '/condicaocamadaesquema/', { Cod_Condicao: obj.CON, Cod_Camada: obj.CAM, Cod_Esquema_Calculo: obj.ESQ }, { headers: { 'Content-type': 'application/json' } }).toPromise();
    }
    getEsquemaRelation(): Promise<any> {
        return this.http.get(this.url + '/condicaocamadaesquema/', { headers: { 'Content-type': 'application/json' } }).toPromise();
    }

    async getEsquema() {
        return await Promise.all([
            this.getEsquemaRelation(),
            this.condicionService.getCamadas(),
            this.condicionService.getCondicaos()
        ]);
    }
}



