import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class EmployeesService {

  constructor(private http: HttpClient) { }

  addNewEmployee(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'user_create/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getEmployeeList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_userviewlist/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getEmployeeDetails(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'user_detailsview/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  updateEmployee(data){
    return this.http.put(environment.apiEndpoint+'user_upd_details/'+data.id+'/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }


//   path('user_create/', UserCreate.as_view()),
// path('user_delete/<pk>/', UserDelete.as_view()),
// path('all_userviewlist/', UserListView.as_view()),
  
}
