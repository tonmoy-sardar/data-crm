import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private loginService: LoginService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log(route.queryParams.token)
    var query_token = route.queryParams.token
    if (query_token != undefined) {
      console.log(query_token)
      var data = {
        token: query_token
      }
      this.loginService.loginByToken(data).subscribe(
        res => {
          console.log(res)
          // var navExtras = state.url && state.url != '/' ? { queryParams: { returnto: state.url } } : undefined;
          this.router.navigate([state.url]);
          return Observable.of(true);
        },
        error => {
          this.router.navigate(['/login']);
          return Observable.of(false);
        }
      )
    }

    if (localStorage.getItem('isLoggedin')) {
      return Observable.of(true);
    }

    this.router.navigate(['/login']);
    return Observable.of(false);
  }
}
