import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Global } from './global';
import { Sacceso } from '../models/sacceso';
import { Sequencia } from '../models/sequencia';

@Injectable()
export class SaccesoService {
    public url: string;
    public aSequenciaAcceso: Array<any>;
    private header = { headers: { 'Content-type': 'application/json' } };

    constructor(private http: HttpClient) {
        this.url = Global.url;
    }

    postSacceso(seq: Sacceso) {
        return this.http.post(this.url + '/seqcampo/', { Cod_Campo: seq.sSeqAcceso, Nome_Campo: seq.sDesAcceso}, this.header);
    }

    postSaccesoComp(seq: Sacceso): Promise<any> {
         return this.http.post(this.url + '/sequencia/', { Cod_Sequencia: seq.sSeqAcceso, Nome_Sequencia: seq.sDesAcceso}, this.header)
         .pipe(
             map((elem: any) =>
                seq._parents.forEach(campo => {
                    this.postSeqAux(elem.id, campo.sId).subscribe();
                }))
         ).toPromise();
    }

    postSeqAux(seqId: any, campoId: any) {
        return this.http.post(this.url + '/seqaux/',
                                { id_Sequencia: seqId, id_Campo: campoId},
                                this.header
                              );
    }

    getSaccesoList(): Observable <any> {
        return this.http.get(this.url + '/seqcampo/', this.header);
    }

    getLastSeqCampo() {
        return this.http.get(this.url + '/seqcampo/last/', this.header);
    }

    getLastSequencia(): Promise<any> {
        return this.http.get(this.url + '/sequencia/last/', this.header).toPromise();
    }

    getSequencias(): Observable<Sequencia[]> {
        return this.http.get<Sequencia[]>(`${this.url}/sequencia/`, this.header);
    }
}
