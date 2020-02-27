import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class DadosMestresComposicaoPrecoService {

  public dadosMestresPrecoUrl = "https://swapi.co/api/planets"

  constructor (private http: HttpClient) { }

  listar() {
    return this.http.get<any[]>(`${this.dadosMestresPrecoUrl}`)
  }

  
}
