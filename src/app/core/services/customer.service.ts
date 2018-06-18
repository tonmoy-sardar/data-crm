import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

@Injectable()
export class CustomerService {

  constructor(
    private http: HttpClient
  ) { }

  
  getCustomerList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_customer/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
}
