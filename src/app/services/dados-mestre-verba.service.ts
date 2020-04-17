import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '@env/environment';
import { MasterDataMoney } from '@models/masterdatamoney'
@Injectable({
  providedIn: 'root'
})
export class DadosMestreVerbaService {

  public dadosMestreVerbaUrl = `${environment.apiUrl}/pricing_parsing/dadosmestreverba`;
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
    return this.http.get<any[]>(this.dadosMestreVerbaUrl);
  }

  get nextUrlValue() {
    return this.nextUrlSubject.value;
  }

  get previousUrlValue() {
    return this.previousUrlSubject.value;
  }

  public get dadosMestresVerba(): Promise<MasterDataMoney[]> {
    const result = this.http.get(this.dadosMestreVerbaUrl);
    return result.toPromise()
    .then((response: any) => {
      if ( response.next ) {
        this.nextUrlSubject.next(response.next);
      }
      return response.results as MasterDataMoney[];
    })
    .catch(err => {
      throw new Error(err);
    });
  }

  public loadNext(url): Promise<MasterDataMoney[]> {
    if (!url) {
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
      return response.results as MasterDataMoney[];
    })
    .catch(err => {
      throw new Error(err);
    });
  }
}
