import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '@env/environment'
import { BehaviorSubject, Observable } from 'rxjs'
import { Material } from '@models/material'
import { Filter } from '@models/filter'

@Injectable({
  providedIn: 'root'
})
export class FilterModalService {
  private url = `${environment.apiUrl}/pricing_parsing/Ettprdfilter`
  private filterSubject: BehaviorSubject<Filter>
  public filterCurrent: Observable<Filter>

  constructor(
    private http: HttpClient
  ){
    this.filterSubject = new BehaviorSubject<Filter>(new Filter());
    this.filterCurrent = this.filterSubject.asObservable();
  }



  get currentFilterValue() {
    return this.filterSubject.getValue()
  }

  unsetFilter() {
    this.filterSubject.next(null);
  }

  setFilter(value) {
    this.filterSubject.next(value)
  }



  get materials(): Promise<Material[]>{
    return this.http.get<Material[]>(this.url).toPromise()
    .then((result: any) => {
      return result.results as Material[];
    })
    .catch(err => {
      throw new Error(err);
    });
  }


}
