import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Diretrix } from '@models/diretrix';
import { Directory } from '@app/models/directory';
import { Category } from '@models/category'

@Injectable({
  providedIn: 'root'
})
export class DiretrizesEstrategicasService {

  public url = `${environment.apiUrl}/pricing_parsing/diretrizesestrategicas`;
  public directoryURL = `${environment.apiUrl}/pricing_parsing/diretrizesdirectories`;
  public categoryUrl = `${environments.apiUrl}/pricing_parsing/diretrizescategories/`
  constructor(private http: HttpClient) { }

  public get diretrizesEstrategicas(): Promise<Diretrix[]> {
    const result = this.http.get(this.url);
    return result.toPromise()
    .then((res: any) => {
      return res.results as Diretrix[];
    })
    .catch(err => {
      throw new Error(err);
    });
  }

  getDirectories(): Promise<Directory[]>{
    const result =  this.http.get(this.directoryURL).toPromise();
    return result.then(
      (response: any) => {
        return response.results as Directory[];
      }
    ).catch(error => { throw new Error(error); });
  }

  getCategories(param: number): Promise<Category[]> {
    const options = param ?
   { params: new HttpParams().set('CODGRPMER', param) } : {};
    return this
      .http
      .get(this.categoryUrl, options)
      .toPromise()
      .then((response: any) => {
        return response.results as Category[];
      })
      .catch(error => { throw new Error(error ); });

  }

}

