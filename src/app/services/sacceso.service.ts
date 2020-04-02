import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from './global';
import { Sequencia } from '../models/sequencia';
import { Campo } from 'app/models/campo';

@Injectable({providedIn: 'root'})
export class SaccesoService {
    public url: string;
    public aSequenciaAcceso: Array<any>;
    private header = { headers: { 'Content-type': 'application/json' } };

  constructor(private http: HttpClient) {
    this.url = Global.url;
  }

    getCampos(): Promise<any> {
        return this.http.get(this.url + '/seqcampo/', this.header)
            .toPromise()
            .then((response: any) => {
                return response.results as Campo[];
            })
            .catch(err => {
                throw new Error(err);
            });
      }

    postSequencia(sequencia: Sequencia): Promise<any> {
         const camps: Array<any> = new Array<any>();
         sequencia.campos.map(elem => {
            camps.push(elem.Cod_Campo);
         });
         return this.http
            .post(this.url + '/sequencia/',
                { Cod_Sequencia: sequencia.Cod_Sequencia,
                  Nome_Sequencia: sequencia.Nome_Sequencia,
                  campos: camps
                }, this.header).toPromise();
    }

    postCampo(campo: Campo): Promise<any> {
        return this.http
            .post(this.url + '/seqcampo/', { Cod_Campo: campo.Cod_Campo, Nome_Campo: campo.Nome_Campo}, this.header).toPromise();
    }

    getLastSequencia(): Promise<any> {
        return this.http.get(this.url + '/sequencia/last/', this.header).toPromise();
    }

    getLastCampo(): Promise<any> {
      return this.http.get(this.url + '/seqcampo/last/', this.header).toPromise();
  }
}
