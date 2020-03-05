import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DiretrizesEstrategicasService {

  public _http = "https://pricing.tangotechapp.com/api/diretrizestrategica";

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get(`${this._http}`)
  }

  getDistretriz(): Observable<any>{
    return this.http.get(this._http);
  }
}
