import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadosMestreVerbaService {

  public dadosMestreVerbaUrl = "https://pricing.tangotechapp.com/api/dadosmestreverba";

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<any[]>(`${this.dadosMestreVerbaUrl}`)
  }

  getDadosMestresVerba(): Observable<any>{
    return this.http.get(this.dadosMestreVerbaUrl);
  }
}
