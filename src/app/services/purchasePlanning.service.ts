import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PurchasePlan } from '@models/purchaseplan';
import { BillingBranch } from '@models/billingbranch';
import { ShipmentBranch } from '@models/shipmentbranch';
import { State } from '@models/state';
import { Material } from '@models/material';

@Injectable({
  providedIn: 'root'
})
export class PurchasePlanningService {

  private baseEndPointPath = `${environment.apiUrl}/pricing_parsing`;
  private planningDataurl = `${this.baseEndPointPath}/planocompras/`;
  private shipmtBranchUrl = `${this.baseEndPointPath}/planocomprasfilial/`;
  private bilingBranchUrl = `${this.baseEndPointPath}/planocomprasfaturamento/`;
  private statesUrl = `${this.baseEndPointPath}/planocomprasestado/`;
  private productshUrl = `${this.baseEndPointPath}/planocomprasproduto/`;


  constructor(
    private http$: HttpClient
  ) {}

  public get planningData(): Promise<PurchasePlan[]> {
      return this.http$.get(this.planningDataurl).toPromise()
        .then((response: any) => {
          return response.results as PurchasePlan[];
        })
        .catch((error) => {
          throw new Error(error);
        });
  }

  getShipmentBranches(): Promise<ShipmentBranch[]>{
    const result =  this.http$.get(this.shipmtBranchUrl).toPromise();
    return result.then(
      (response: any) => {
        return response.results as ShipmentBranch[];
      }).catch(error => { throw new Error(error); });
  }

  getBillingBranches(param: any): Promise<BillingBranch[]> {
    const options = param ?
   { params: new HttpParams().set('CODFILEPD', param) } : {};
    return this.http$.get(this.bilingBranchUrl, options).toPromise()
      .then((response: any) => {
        return response.results as BillingBranch[];
      })
      .catch(error => { throw new Error(error ); });

  }

  getStates(param: any): Promise<State[]> {
    const options = param ?
   { params: new HttpParams().set('CODFILFAT', param) } : {};
    return this.http$.get(this.statesUrl, options).toPromise()
      .then((response: any) => {
        return response.results as State[];
      })
      .catch(error => { throw new Error(error ); });
  }

  getProducts(param: any): Promise<Material[]> {
    const options = param ?
   { params: new HttpParams().set('CODESTUNI', param) } : {};
    return this.http$.get(this.productshUrl, options).toPromise()
      .then((response: any) => {
        return response.results as Material[];
      })
      .catch(error => { throw new Error(error ); });

  }

  getFilteredData(params: any): Promise<PurchasePlan[]> {
    // tslint:disable-next-line: max-line-length
    const url = this.planningDataurl;
    const options = {params: {}};
    Object.keys(params).map(key => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
          let value = params[key]
          if(key === 'codprd') {
              value = params[key].split('-')[0];
          }
          options.params[key.toUpperCase()] = value;
        }
    });
    const result =  this.http$.get(url, options).toPromise();
    return result.then(
      (response: any) => {
        return response.results as PurchasePlan[];
      }
    ).catch(error => {throw new Error(error); });
  }

}
