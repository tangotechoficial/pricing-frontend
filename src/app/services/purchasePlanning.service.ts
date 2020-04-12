import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PurchasePlan } from '@models/purchaseplan';

@Injectable({
  providedIn: 'root'
})
export class PurchasePlanningService {

  private planningUrl = `${environment.apiUrl}/pricing_parsing/planocompras/?CODESTUNI=MG&CODFILEPD=1&CODPRD=100218&CODFILFAT=1`


  constructor(
    private http$: HttpClient
  ) {}

  public get planningData(): Promise<PurchasePlan[]> {
      return this.http$.get(this.planningUrl).toPromise()
        .then((response) => {
          return response.results as PurchasePlan[];
        })
        .catch((error) => {
          throw new Error(error);
        });
  }
}
