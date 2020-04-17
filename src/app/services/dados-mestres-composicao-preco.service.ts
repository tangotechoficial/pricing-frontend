import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '@env/environment';
import {PriceComposition} from '@models/pricecomposition'


@Injectable({
  providedIn: 'root'
})
export class DadosMestresComposicaoPrecoService {

  public dadosMestresPrecoUrl = `${environment.apiUrl}/pricing_parsing/dadosmestrecomposicao`;
  public nextUrlSubject: BehaviorSubject<string>;
  public nextUrlObservable: Observable<string>;
  public previousUrlSubject: BehaviorSubject<string>;
  public previousUrlObservable: Observable<string>;


  constructor(private http: HttpClient) {
    this.nextUrlSubject = new BehaviorSubject<string>('');
    this.nextUrlObservable = this.nextUrlSubject.asObservable();
    this.previousUrlSubject = new BehaviorSubject<string>('');
    this.previousUrlObservable = this.previousUrlSubject.asObservable();
   }

  listar() {
    return this.http.get<any[]>(this.dadosMestresPrecoUrl);
  }

  get nextUrlValue() {
    return this.nextUrlSubject.value;
  }

  get previousUrlValue() {
    return this.previousUrlSubject.value;
  }

  public get dadosMestresPreco(): Promise<PriceComposition[]> {
    const result = this.http.get(this.dadosMestresPrecoUrl);
    return result.toPromise()
    .then((response: any) => {

      if ( response.next ) {
        this.nextUrlSubject.next(response.next);
      }
      return response.results as PriceComposition[];
    })
    .catch(err => {
      throw new Error(err);
    });
  }

  public loadNext(url): Promise<PriceComposition[]> {
    if(!url) {
      return;
    }
    const result = this.http.get(url);
    return result.toPromise()
    .then((response: any) => {

      if ( response.next ) {
        this.nextUrlSubject.next(response.next);
      }
      if ( response.previous ) {
        this.previousUrlSubject.next(response.previous);
      }
      return response.results as PriceComposition[];
    })
    .catch(err => {
      throw new Error(err);
    });
  }
}
