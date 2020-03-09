import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DadosMestresComposicaoPrecoService {

  public dadosMestresPrecoUrl = "https://pricing.tangotechapp.com/api/dadosmestrecomposicao"

  constructor (private http: HttpClient) { }

  listar() {
    return this.http.get<any[]>(`${this.dadosMestresPrecoUrl}`)
  }

  getDadosMestresPreco(): Observable<any>{
    return this.http.get(this.dadosMestresPrecoUrl);
  }
}
