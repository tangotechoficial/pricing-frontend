import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PurchasePlan } from '@app/models/purchaseplan';

@Injectable({
  providedIn: 'root'
})
export class PlanningDataManagerService {
  planSubject: BehaviorSubject<PurchasePlan[]>;
  actualPlanData: Observable<PurchasePlan[]>;

  constructor() {
    this.planSubject = new BehaviorSubject<PurchasePlan[]>(undefined);
    this.actualPlanData = this.planSubject.asObservable();
  }

  get currentPlanValue() {
    return this.planSubject.value;
  }

  setData(value) {
    this.planSubject.next(value);
  }
}
