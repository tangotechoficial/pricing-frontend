import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '@env/environment';
import { Diretrix } from '@models/diretrix';
import { Directory } from '@app/models/directory';
import { Group } from '@app/models/group';
import { Category } from '@app/models/category';
import { SubCategory } from '@app/models/subcategory';
import { Fornecedor } from '@app/models/fornecedor';
import { Filial } from '@app/models/filial';
import { Filter } from '@app/models/filter';

@Injectable({
  providedIn: 'root'
})
export class DiretrizesEstrategicasService {

  public url = `${environment.apiUrl}/pricing_parsing/diretrizesestrategicas/`;
  public directoryURL = `${environment.apiUrl}/pricing_parsing/diretrizesdirectories/`;
  public groupURL = `${environment.apiUrl}/pricing_parsing/diretrizesgroups/`;
  public categoryUrl = `${environment.apiUrl}/pricing_parsing/diretrizescategories/`;
  public subCategoryURL = `${environment.apiUrl}/pricing_parsing/diretrizessubcategories/`;
  public fornecedorURL = `${environment.apiUrl}/pricing_parsing/diretrizesfornecedor/`;
  public filialURL = `${environment.apiUrl}/pricing_parsing/diretrizesfilial/`;
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

  get nextUrlValue() {
    return this.nextUrlSubject.value;
  }

  unsetNextUrl(){
    this.nextUrlSubject.next('');
  }

  public get diretrizesEstrategicas(): Promise<Diretrix[]> {
    this.unsetNextUrl();
    const result = this.http.get(this.url);
    return result.toPromise()
    .then((response: any) => {
      if ( response.next ) {
        this.nextUrlSubject.next(response.next);
      }
      return response.results as Diretrix[];
    })
    .catch(err => {
      throw new Error(err);
    });
  }

  getDirectories(): Promise<Directory[]> {
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

  getSubCategories(param: any): Promise<SubCategory[]> {
    const options = param ? { params: new HttpParams().set('CODFMLMER', param) } : {};
    const result = this.http.get(this.subCategoryURL, options).toPromise();
    return result.then(
      (response: any) => {
        return response.results as SubCategory[];
      }
    ).catch(error => {throw new Error(error); });

  }

  getFornecedores(subCat: any, category: any): Promise<Fornecedor[]> {
    const options = {
      params: {
        CODCLSMER: subCat,
        CODFMLMER: category
      }
    };
    const result =  this.http.get(this.fornecedorURL, options).toPromise();
    return result.then(
      (response: any) => {
        return response.results as Fornecedor[];
      }
    ).catch(error => {throw new Error(error); });

  }

  getFiliais(frn, cat, subCat): Promise<Filial[]> {
    const options = {
      params: {
        CODDIVFRN: frn,
        CODCLSMER: subCat,
        CODFMLMER: cat
      }
    };
    const result =  this.http.get(this.filialURL, options).toPromise();
    return result.then(
      (response: any) => {
        return response.results as Filial[];
      }
    ).catch(error => {throw new Error(error); });

  }

  getFilteredData(params: any): Promise<Diretrix[]> {
    // tslint:disable-next-line: max-line-length
    this.unsetNextUrl();
    let url = this.url;
    const options = {};
    let connectr = '?';
    Object.keys(params).map(key => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
          if (key !== 'desdrtcllatu') {
            connectr = '&';
          }
          if (params[key] !== null) {
            url = url + connectr + key.toUpperCase() + '=' + params[key];
          }
        }
    });
    const result =  this.http.get(url).toPromise();
    return result.then(
      (response: any) => {
        if ( response.next ) {
          this.nextUrlSubject.next(response.next);
        }
        return response.results as Diretrix[];
      }
    ).catch(error => {throw new Error(error); });
  }

  public loadNext(url): Promise<Diretrix[]> {
    this.unsetNextUrl();
    if (!url) {
      return;
    }
    const result = this.http.get(url);
    return result.toPromise()
    .then((response: any) => {
      if ( response.next ) {
        this.nextUrlSubject.next(response.next);
      }
      return response.results as Diretrix[];
    })
    .catch(err => {
      throw new Error(err);
    });
  }

}

