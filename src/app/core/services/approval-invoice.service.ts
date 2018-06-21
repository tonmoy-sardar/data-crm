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

  sendMailByAllInvoiceApproval(data): Observable<any>{
    //console.log("ss"+data)
    return this.http.post(environment.apiEndpoint+'invoice_send_mail/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  changeApproveStatusApproveInvoice(data): Observable<any>{
    return this.http.patch(environment.apiEndpoint+'approve_invoice_status/'+data.id+'/',data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
}
