import { Injectable } from '@angular/core'
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HTTP_INTERCEPTORS} from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs'
import { delay, dematerialize, mergeMap, materialize } from 'rxjs/operators'
import * as weeks from '@datasources/plano-de-compras.json'

@Injectable()
export class FakeDataProviderInterceptor implements HttpInterceptor{

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {url, method, headers, body } = request;
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      if (url.endsWith('/api/planodecompras')) {
        return loadTableData()
      }
      return next.handle(request);
    }

    function loadTableData() {

      if (!weeks) {
        return error('Could not load data')
      }
      return ok(weeks)
    }

    function ok(body?) {
        return of(new HttpResponse({ status: 200, body }))
    }

    function error(message) {
        return throwError({ error: { message } });
    }

  }
}
