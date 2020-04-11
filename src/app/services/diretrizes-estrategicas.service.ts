import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Diretrix } from '@models/diretrix';
import { Directory } from '@app/models/directory';
import { Group } from '@app/models/group';
import { Category } from '@app/models/category';
import { SubCategory } from '@app/models/subcategory';
import { Fornecedor } from '@app/models/fornecedor';
import { Filial } from '@app/models/filial';

@Injectable({
  providedIn: 'root'
})
export class DiretrizesEstrategicasService {

  public url = `${environment.apiUrl}/pricing_parsing/diretrizesestrategicas`;
  public directoryURL = `${environment.apiUrl}/pricing_parsing/diretrizesdirectories/`;
  public groupURL = `${environment.apiUrl}/pricing_parsing/diretrizesgroups/`;
  public categoryUrl = `${environment.apiUrl}/pricing_parsing/diretrizescategories/`;
  public subCategoryURL = `${environment.apiUrl}/pricing_parsing/diretrizessubcategories/`;
  public fornecedorURL = `${environment.apiUrl}/pricing_parsing/diretrizesfornecedor/`;
  public filialURL = `${environment.apiUrl}/pricing_parsing/diretrizesfilial/`;

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
      }).catch(error => { throw new Error(error); });
  }

  getCategories(param: any): Promise<Category[]> {
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

  getGroups(param: any): Promise<Group[]> {
    const options = param ?
   { params: new HttpParams().set('DESDRTCLLATU', param) } : {};
    const result =  this.http.get(this.groupURL, options).toPromise();
    return result.then(
      (response: any) => {
        return response.results as Group[];
      }
    ).catch(error => {throw new Error(error); });

  }

  getSubCategory(param: any): Promise<SubCategory[]> {
    const options = param ? { params: new HttpParams().set('CODFMLMER', param) } : {};
    const result = this.http.get(this.subCategoryURL, options).toPromise();
    return result.then(
      (response: any) => {
        return response.results as SubCategory[];
      }
    ).catch(error => {throw new Error(error); });

  }

  getFornecedor(param: any): Promise<Fornecedor[]> {
    const options = param ? { params: new HttpParams().set('CODCLSMER', param) } : {};
    const result =  this.http.get(this.fornecedorURL, options).toPromise();
    return result.then(
      (response: any) => {
        return response.results as Fornecedor[];
      }
    ).catch(error => {throw new Error(error); });

  }

  getFilial(param: any): Promise<Filial[]> {
    const options = param ? { params: new HttpParams().set('CODDIVFRN', param) } : {};
    const result =  this.http.get(this.filialURL, options).toPromise();
    return result.then(
      (response: any) => {
        return response.results as Filial[];
      }
    ).catch(error => {throw new Error(error); });

  }

}


