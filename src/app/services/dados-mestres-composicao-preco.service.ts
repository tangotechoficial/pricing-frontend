import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';


@Injectable({
  providedIn: 'root'
})
export class DadosMestresComposicaoPrecoService {

  public dadosMestresPrecoUrl = `${environment.apiUrl}/dadosmestrecomposicao`;

  constructor (private http: HttpClient) { }

  listar() {
    return this.http.get<any[]>(this.dadosMestresPrecoUrl)
  }

  public get dadosMestresPreco(): Observable<any>{
    const result = this.http.get(this.dadosMestresPrecoUrl);
    return result
  }
}
