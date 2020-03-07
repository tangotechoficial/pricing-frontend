import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DadosMestreVerbaService {

  public dadosMestreVerbaUrl = `${environment.apiUrl}/dadosmestre`;

  constructor(private http: HttpClient) { }

  listar() {
    debugger;
    return this.http.get<any[]>(this.dadosMestreVerbaUrl)
  }

  public get dadosMestresVerba(): Observable<any>{
    const result = this.http.get(this.dadosMestreVerbaUrl);
    return result
  }
}
