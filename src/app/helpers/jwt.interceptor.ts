import { Observable } from 'rxjs';
import { AuthenticationService } from '@services/authentication.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable()
export class JWTInterceptorHelper implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authenticationService.currentTokenValue;
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `JWT ${token}`
        }
      });
    }
    return next.handle(request);
  }
}