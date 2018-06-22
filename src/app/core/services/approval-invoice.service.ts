import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

@Injectable()
export class ApprovalInvoiceService {

  constructor(
    private http: HttpClient
  ) { }

  getApproveInvoiceList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'getapprove_invoice/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }  
    
  getApproveInvoiceListByCustomerId(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_pending_invoice_dropdown/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  changeApproveDissapproveStatus(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'approve_invoice_status/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
}
