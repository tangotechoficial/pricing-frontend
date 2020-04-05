import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DiretrizesEstrategicasService {

  public url = `${environment.apiUrl}/analitica/diretrizesestrategica`
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get(this.url)
  }

  public get diretrizesEstrategicas(): Observable<any>{
    return this.http.get(this.url);
  }
}
