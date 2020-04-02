import {Injectable} from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {AuthenticationService} from '@services/authentication.service';

@Injectable({providedIn: 'root'})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const token = this.authService.currentTokenValue;

    if(token) {
      return true;
    }

    this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: state.url
      }
    });
    return false;
  }
}
