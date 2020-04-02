import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from './global';
import { Camada } from 'app/models/camadas';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CamadaService {

    public url: string;
    public camadas: Array<Camada>;
    constructor(
        private http: HttpClient,
    ) {
        this.url = Global.url;
    }

    getCamadas(): Promise<any> {
        return this.http.get(this.url + '/camada/', { headers: { 'Content-type': 'application/json' } }).toPromise();
    }

    getCondicaos() {
        return this.http.get(this.url + '/condicao/', { headers: { 'Content-type': 'application/json' } }).toPromise();
    }

    getCamadasByType(type: any): Promise<Camada[]> {
        return this.getCamadas()
            .then(response => {
                response = response.filter((elem: any) => {
                    return elem.TIPO_BASE_VENDAS.toLowerCase() === type.toLowerCase();
                });
                return response as Camada[];
            })
            .catch(err => {
                throw new Error(err);
            });
    }
}



