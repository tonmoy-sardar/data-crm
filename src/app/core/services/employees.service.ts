import { Injectable } from '@angular/core';

import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class EmployeesService {

  constructor(private http: HttpClient) { }

  addNewEmployee(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'employee/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getEmployeeList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_employee/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  
}
