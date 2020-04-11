import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Diretrix } from '@models/diretrix';
import { Directory } from '@app/models/directory';
import { Group } from '@app/models/group';
import { SubCategory } from '@app/models/subcategory';
import { Fornecedor } from '@app/models/fornecedor';
import { Filial } from '@app/models/filial';

@Injectable({
  providedIn: 'root'
})
export class DiretrizesEstrategicasService {

  public url = `${environment.apiUrl}/pricing_parsing/diretrizesestrategicas`;
  public directoryURL = `${environment.apiUrl}/pricing_parsing/diretrizesdirectories`;
  public groupURL = `${environment.apiUrl}/pricing_parsing/diretrizesgroups`;
  public subCategoryURL = `${environment.apiUrl}/pricing_parsing/diretrizessubcategories`;
  public fornecedorURL = `${environment.apiUrl}/pricing_parsing/diretrizesfornecedor`;
  public filialURL = `${environment.apiUrl}/pricing_parsing/diretrizesfilial`;

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
    ).catch(error => {throw new Error(error)});

  }

  getGroups(): Promise<Group[]>{
    const result =  this.http.get(this.groupURL).toPromise();
    return result.then(
      (response: any) => {
        return response.results as Group[];
      }
    ).catch(error => {throw new Error(error)});

  }

  getSubCategory(): Promise<SubCategory[]>{
    const result =  this.http.get(this.subCategoryURL).toPromise();
    return result.then(
      (response: any) => {
        return response.results as Subcategory[];
      }
    ).catch(error => {throw new Error(error)});

  }

  getFornecedor(): Promise<Fornecedor[]>{
    const result =  this.http.get(this.fornecedorURL).toPromise();
    return result.then(
      (response: any) => {
        return response.results as Fornecedor[];
      }
    ).catch(error => {throw new Error(error)});

  }

  getFilial(): Promise<Filial[]>{
    const result =  this.http.get(this.filialURL).toPromise();
    return result.then(
      (response: any) => {
        return response.results as Filial[];
      }
    ).catch(error => {throw new Error(error)});

  }

}


