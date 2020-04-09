import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { MasterDataMoney } from '@models/masterdatamoney'
@Injectable({
  providedIn: 'root'
})
export class DadosMestreVerbaService {

  public dadosMestreVerbaUrl = `${environment.apiUrl}/pricing_parsing/dadosmestreverba`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<any[]>(this.dadosMestreVerbaUrl)
  }

  public get dadosMestresVerba(): Promise<MasterDataMoney[]>{
    const result = this.http.get(this.dadosMestreVerbaUrl);
    return result.toPromise()
    .then((result: any) => {
      return result.results as MasterDataMoney[];
    })
    .catch(err => {
      throw new Error(err);
    });
  }
}
