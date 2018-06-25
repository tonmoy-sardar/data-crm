import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { NgxPermissionsService } from 'ngx-permissions';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private loginService: LoginService,
    private permissionsService: NgxPermissionsService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    var query_token = route.queryParams.token;
    var set = route.queryParams.set;
    if (localStorage.getItem('isLoggedin')) {
      return Observable.of(true);
    }

    if (query_token != undefined && set != undefined) {
      var data = {
        token: query_token,
        set_id: set
      }
      this.loginService.loginByToken(data).subscribe(
        response => {
          localStorage.setItem('isLoggedin', 'true');
          localStorage.setItem('logedUserEmail', response.email);
          localStorage.setItem('logedUserToken', response.token);
          localStorage.setItem('logedUserUserId', response.user_id);
          localStorage.setItem('logedUserUserName', response.username);
          localStorage.setItem('userRole', response.user_role);
          localStorage.setItem('approvalSet', set);
          this.permissionsService.flushPermissions();
          const perm = []
          perm.push(localStorage.getItem('userRole'))
          this.permissionsService.addPermission(perm)
          this.permissionsService.loadPermissions(perm, (permissionName, permissionStore) => {
            return !!permissionStore[permissionName];
          })
          if (response.link_session) {
            this.router.navigate(['/approval-invoice']);
            return Observable.of(false);
          }
          else {
            this.router.navigate(['/link-expire']);
            return Observable.of(false);
          }

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
