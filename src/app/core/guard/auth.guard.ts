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

    var query_token = route.queryParams.token;
    
    if (localStorage.getItem('isLoggedin')) {
      return Observable.of(true);
    }

    if (query_token != undefined) {
      var data = {
        token: query_token
      }
      this.loginService.loginByToken(data).subscribe(
        response => {
          localStorage.setItem('isLoggedin', 'true');
          localStorage.setItem('logedUserEmail', response.email);
          localStorage.setItem('logedUserToken', response.token);
          localStorage.setItem('logedUserUserId', response.user_id);
          localStorage.setItem('logedUserUserName', response.username);
          localStorage.setItem('userRole', response.user_role);
          this.router.navigate(['/approval-invoice']);
          return Observable.of(false);
        },
        error => {
          this.router.navigate(['/login']);
          return Observable.of(false);
        }
      )
    }
    
    this.router.navigate(['/login']);
    return Observable.of(false);
  }
}
