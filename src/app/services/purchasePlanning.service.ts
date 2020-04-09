import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map, timeout} from 'rxjs/operators';
import { PurchasePlan } from '@models/purchaseplan'

@Injectable({providedIn: 'root'})
export class PurchasePlanningService {
  private planningUrl = `${environment.apiUrl}/pricing_parsing/planocompras/?CODESTUNI=MG&CODFILEPD=1&CODPRD=100218&CODFILFAT=1`


  constructor(
    private httpClient: HttpClient
  ) {}

  public get planningData(): Observable<any> {
    return this.httpClient
      .get(this.planningUrl)
  }
}
