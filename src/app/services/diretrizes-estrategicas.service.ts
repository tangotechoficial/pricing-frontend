import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Diretrix } from '@models/diretrix';
import { Directory } from '@app/models/directory';
import { Groups } from '@app/models/groups';

@Injectable({
  providedIn: 'root'
})
export class DiretrizesEstrategicasService {

  public url = `${environment.apiUrl}/pricing_parsing/diretrizesestrategicas`;
  public directoryURL = `${environment.apiUrl}/pricing_parsing/diretrizesdirectories`;
  public groupsURL = `${environment.apiUrl}/pricing_parsing/diretrizesgroups`;

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

  getGroups(): Promise<Groups[]>{
    const result =  this.http.get(this.groupsURL).toPromise();
    return result.then(
      (response: any) => {
        return response.results as Groups[];
      }
    ).catch(error => {throw new Error(error)});

  }

}

