import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DiretrizesEstrategicasService {

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get(`${environment.apiUrl}/diretrizesestrategica`)
  }

  public get diretrizesEstrategicas(): Observable<any>{
    return this.http.get(`${environment.apiUrl}/diretrizesestrategica`);
  }
}
