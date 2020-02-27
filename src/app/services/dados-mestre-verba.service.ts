import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DadosMestreVerbaService {

  public dadosMestreVerbaUrl = "https://swapi.co/api/planets";

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<any[]>(`${this.dadosMestreVerbaUrl}`)
  }

}
