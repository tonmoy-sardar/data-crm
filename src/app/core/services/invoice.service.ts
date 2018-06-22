import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

@Injectable()
export class InvoiceService {

  constructor(
    private http: HttpClient
  ) { }

  getInvoiceList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_invoice/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getInvoiceDetailsByPurchaseInvId(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'all_invoice/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
    
  getInvoiceListByCustomerId(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'specific_invoice_dropdown/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  sendMailByAllInvoice(data): Observable<any>{
    return this.http.post(environment.apiEndpoint+'admin_send_mail/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

 
}
