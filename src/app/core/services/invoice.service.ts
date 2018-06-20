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

  getSearchInvoiceList(params): Observable<any>{
    return this.http.get(environment.apiEndpoint+'search_invoice/?'+params, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  getCustomerListtWithoutPagination(): Observable<any>{
    return this.http.get(environment.apiEndpoint+'customer_dropdown/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }
  
  getInvoiceByCustomerId(id): Observable<any>{
    return this.http.get(environment.apiEndpoint+'specific_invoice_dropdown/'+id+'/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
  }

  sendMailByAllInvoice(data): Observable<any>{
    console.log("ss"+data)
    return this.http.post(environment.apiEndpoint+'send_mail_by_all_invoice/', data, {
      headers: new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem('logedUserToken'))
    })
    
  }

 
}
