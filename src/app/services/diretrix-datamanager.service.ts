import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Diretrix } from '@app/models/diretrix';

@Injectable({
  providedIn: 'root'
})
export class DiretrixDataManagerService {
  diretrizesSubject: BehaviorSubject<Diretrix[]>;
  actualDiretrixData: Observable<Diretrix[]>;

  constructor() {
    this.diretrizesSubject = new BehaviorSubject<Diretrix[]>(undefined);
    this.actualDiretrixData = this.diretrizesSubject.asObservable();
  }

  get currentDiretrixValue() {
    return this.diretrizesSubject.value
  }

  setData(value) {
    this.diretrizesSubject.next(value)
  }
}

