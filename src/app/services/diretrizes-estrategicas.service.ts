import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiretrizesEstrategicasService {

  public diretrizesUrl = "https://pricing.tangotechapp.com/api/diretrizestrategica";

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get(`${this.diretrizesUrl}`)
  }
}
