import { HttpClient } from '@angular/common/http';
import { PlanningRequest } from './../models/planningrequest';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlannedData } from '@app/models/plannedData';

@Injectable({
  providedIn: 'root'
})
export class PlanningPopupDataManagerService {

  url$ = `${environment.apiUrl}/analitica/planejado/`;

  weekSubject: BehaviorSubject<string>;
  currentWeek: Observable<string>;
  yearSubject: BehaviorSubject<string>;
  currentYear: Observable<string>;
  monthSubject: BehaviorSubject<string>;
  currentMonth: Observable<string>;
  productSubject: BehaviorSubject<string>;
  stateSubject: BehaviorSubject<string>;
  currentProduct: Observable<string>;
  currentState: Observable<string>;
  plannedCMVSubject: BehaviorSubject<any>;
  plannedVerbaSubject: BehaviorSubject<any>;
  currentCMV: Observable<any>;
  currentVerba: Observable<any>;

  planDataSubject: BehaviorSubject<PlannedData>;
  actualPlanData: Observable<PlannedData>;

  requestData: PlanningRequest;

  constructor(
    private http$: HttpClient
  ) {
    this.planDataSubject = new BehaviorSubject<PlannedData>(undefined);
    this.actualPlanData = this.planDataSubject.asObservable();


    this.weekSubject = new BehaviorSubject<string>('');
    this.currentWeek = this.weekSubject.asObservable();
    this.yearSubject = new BehaviorSubject<string>('');
    this.currentYear = this.yearSubject.asObservable();
    this.monthSubject = new BehaviorSubject<string>('');
    this.currentMonth = this.monthSubject.asObservable();

    this.productSubject = new BehaviorSubject<string>('');
    this.currentProduct = this.productSubject.asObservable();
    this.stateSubject = new BehaviorSubject<string>('');
    this.currentState = this.stateSubject.asObservable();

    this.plannedCMVSubject = new BehaviorSubject<any>(0);
    this.currentCMV = this.plannedCMVSubject.asObservable();
    this.plannedVerbaSubject = new BehaviorSubject<any>(0);
    this.currentVerba = this.plannedVerbaSubject.asObservable();
  }

  get currentPlanValue() {
    return this.planDataSubject.value;
  }

  get currentWeekValue() {
    return this.weekSubject.value;
  }

  get currentYearValue() {
    return this.yearSubject.value;
  }

  get currentMonthValue() {
    return this.monthSubject.value;
  }

  get currentProductValue() {
    return this.productSubject.value;
  }

  get currentStateValue() {
    return this.stateSubject.value;
  }

  get currentCMVValue() {
    return this.plannedCMVSubject.value;
  }

  get currentVerbaValue() {
    return this.plannedVerbaSubject.value;
  }


  unsetData(){
    this.planDataSubject.next(undefined);
    this.weekSubject = new BehaviorSubject<string>('');
    this.yearSubject = new BehaviorSubject<string>('');
    this.monthSubject = new BehaviorSubject<string>('');
    this.productSubject = new BehaviorSubject<string>('');
    this.stateSubject = new BehaviorSubject<string>('');
    this.plannedCMVSubject.next(0);
    this.plannedVerbaSubject.next(0);
  }

  setPlannedData(value) {
    this.planDataSubject.next(value);
    return this;
  }

  setWeek(value) {
    this.weekSubject.next(value);
    return this;
  }

  setYear(value) {
    this.yearSubject.next(value);
    return this;
  }

  setMonth(value) {
    this.monthSubject.next(value);
    return this;
  }
  setProduct(value) {
    this.productSubject.next(value);
    return this;
  }
  setState(value) {
    this.stateSubject.next(value);
    return this;
  }

  setPlannedCMV(value) {
    this.plannedCMVSubject.next(value);
    return this;
  }

  setPlannedVerba(value) {
    this.plannedVerbaSubject.next(value);
    return this;
  }

  setRequestData(value) {
    this.requestData = value;
  }

  requestPlannedData(): Promise<PlannedData> {
    return this.http$
      .post(this.url$, this.requestData)
      .toPromise()
      .then(
        response => {
          return response as PlannedData;
        }
      )
      .catch( failure => {throw new Error(failure); });
    }

}
