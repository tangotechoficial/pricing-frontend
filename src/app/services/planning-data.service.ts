import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { PurchasePlanningService } from '@services/purchasePlanning.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PurchasePlan } from '@app/models/purchaseplan';
import { PlannedData } from '@app/models/plannedData';

@Injectable({
  providedIn: 'root'
})
export class PlanningDataManagerService {

  private url = `${environment.apiUrl}/pricing_parsing/planocompras/`;
  planSubject: BehaviorSubject<PurchasePlan[]>;
  actualPlanData: Observable<PurchasePlan[]>;

  plannedResult: BehaviorSubject<PlannedData>;
  actualPlannedData: Observable<PlannedData>;


  constructor(
    private http$: HttpClient,
    private purchasePlanningService: PurchasePlanningService
  ) {
    this.planSubject = new BehaviorSubject<PurchasePlan[]>(undefined);
    this.actualPlanData = this.planSubject.asObservable();
    this.plannedResult = new BehaviorSubject<PlannedData>(undefined);
    this.actualPlannedData = this.plannedResult.asObservable();

  }

  get currentPlanValue() {
    return this.planSubject.value;
  }

  unsetPlannedData() {
    this.plannedResult.next(new PlannedData());
  }
  setData(value) {
    this.planSubject.next(value);
  }

  getPlannedData() {
    return this.plannedResult.value;
  }

  setPlannedData(value) {
    this.plannedResult.next(value);
  }

  submitPlan(data: any, filterParams: any): Promise<any> {
    const promises = [];
    const results = [];
    Object.keys(data.get('weeks').controls).forEach((key) => {
      promises.push(
        (() => {
          const objId = data.get('weeks').get(key).get('ID').value;
          const patchData = data.get('weeks').get(key).value;
          return this.http$.patch(`${this.url}${objId}/`, patchData).toPromise()
          .then(
            response => {
              results.push(true);
            }).catch( error => {
              results.push(false);
            }); })());
    });
    return Promise.all(promises)
    .then(
      result => results
    );

  }
}
