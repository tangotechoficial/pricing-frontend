import {Observable} from 'rxjs';

export interface DataProviderService {
    data(): Observable<any>;
}