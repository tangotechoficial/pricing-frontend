import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map, timeout} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PurchasePlanningService {
  private planningUrl = `${environment.apiUrl}/planodecompras`

  constructor(
    private httpClient: HttpClient
  ) {}

  get planningData(): Observable<any> {
    const result = this.httpClient.get(this.planningUrl);
    return result
  }
}