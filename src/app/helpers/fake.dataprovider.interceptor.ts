import { Injectable } from '@angular/core'
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HTTP_INTERCEPTORS} from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs'
import { delay, dematerialize, mergeMap, materialize } from 'rxjs/operators'
import weeks from '@datasources/plano-de-compras.json'
import masterDataMoney from '@datasources/dados-mestre-verba.json'
import priceComps from '@datasources/dados-mestre-preco.json'
import diretrizes from '@datasources/diretriz-estrategica.json'

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
      switch(true) {
        case url.endsWith('/api/planodecompras') && method === 'GET':
          return loadTableData()
        case url.endsWith('/api/dadosmestrecomposicao') && method === 'GET':
          return loadMasterDataComps()
        case url.endsWith('/api/diretrizesestrategica') && method === 'GET':
          return loadDiretrizes()
        case url.endsWith('/api/dadosmestreverba') && method === 'GET':
          return loadMasterDataVerba()
        case url.endsWith('/api/execucao') && method === 'GET':
          return loadTableData()
        default:
          return next.handle(request);
      }
    }

    function loadDiretrizes()
    {
      if(!diretrizes) {
        return error('Could not load data')
      }
      return ok(diretrizes)
    }

    function loadMasterDataVerba()
    {
      if(!masterDataMoney) {
        return error('Could not load data')
      }
      return ok(masterDataMoney)
    }

    function loadMasterDataComps()
    {
      if(!priceComps) {
        return error('Could not load data')
      }
      return ok(priceComps)

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
