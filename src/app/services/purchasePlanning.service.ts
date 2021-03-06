import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map, timeout} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PurchasePlanningService {
  private planningUrl = `${environment.apiUrl}/pricing_parsing/movplncmpcal/`

  constructor(
    private httpClient: HttpClient
  ) {}

  public get planningData(): Observable<any> {
    const result = this.httpClient.get(this.planningUrl);
    return result
  }
}
