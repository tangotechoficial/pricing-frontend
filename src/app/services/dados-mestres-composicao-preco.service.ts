import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import {PriceComposition} from '@models/pricecomposition'

@Injectable({
  providedIn: 'root'
})
export class DadosMestresComposicaoPrecoService {

  public dadosMestresPrecoUrl = `${environment.apiUrl}/pricing_parsing/dadosmestrecomposicao`;

  constructor (private http: HttpClient) { }

  listar() {
    return this.http.get<any[]>(this.dadosMestresPrecoUrl)
  }

  public get dadosMestresPreco(): Promise<PriceComposition[]>{
    const result = this.http.get(this.dadosMestresPrecoUrl);
    return result.toPromise()
    .then((result: any) => {
      return result.results as PriceComposition[];
    })
    .catch(err => {
      throw new Error(err);
    });
  }
}
