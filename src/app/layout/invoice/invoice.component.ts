import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

import { LoadingState } from '../../core/component/loading/loading.component';
import { InvoiceService } from '../../core/services/invoice.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  //form: FormGroup;
  loading: LoadingState = LoadingState.NotReady;
  totalInvoiceList: number;
  invoiceList = [];
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  itemNo: number;

  selectedAll: any;
  selectedCustomer: any[];
  customerName_list: any[] = [];
  customer_invoice_list: any[] = [];
  customer;
  customerInvoice;
  status;
  date: any;
  defaultPagination: number;
  selectedInv;
  customerIdForMail: any[] = [];
  invoice_details_key: boolean;
  Search_invoice_list_key: boolean;

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private toastr: ToastrService
    //private formBuilder: FormBuilder

  ) { }

  ngOnInit() {
    this.selectedCustomer = []
    this.selectedInv = false;
    this.customer = '';
    this.customerInvoice = '';
    this.status = '';
    this.defaultPagination = 1;
    this.itemNo = 0;
    this.itemPerPage = 10;
    this.getInvoiceList();
    this.getCustomerList();

  }


  getInvoiceList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    if (this.customer > 0) {
      params.set('customer_id', this.customer.toString());
    }
    
    if (this.status != "") {
      params.set('status', this.status.toString());
    }
    if (this.date != undefined) {
      var frDate = new Date(this.date.year, this.date.month - 1, this.date.day)
      params.set('created_date', frDate.getFullYear() + "-" + this.dConvert(frDate.getMonth() + 1) + "-" + this.dConvert(frDate.getDate()));
    }
    this.invoiceService.getInvoiceList(params).subscribe(
      (data: any[]) => {
        this.totalInvoiceList = data['count'];
        this.invoiceList = data['results'];
        // console.log(this.invoiceList)
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        //console.log(this.lower_count)
        if (this.totalInvoiceList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalInvoiceList
        }
        this.invoice_details_key = false;
        this.Search_invoice_list_key = true;
        this.loading = LoadingState.Ready;
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  };

  getCustomerList() {
    //console.log(sss);
    this.invoiceService.getCustomerListtWithoutPagination().subscribe(res => {
      this.customerName_list = res;
      //console.log(this.customerName_list);
      this.loading = LoadingState.Ready;
    },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      })
  }

  //change customername
  customerNameChange(id) {
    //console.log(id);

    if (id) {
      this.invoiceService.getInvoiceByCustomerId(id).subscribe(res => {
        this.customer_invoice_list = res;
      })
    }
    else {
      this.customer_invoice_list = [];
      this.getInvoiceList();      
    }

  }
  //
  customerInvoiceChange(id) {
    if (id) {
      this.loading = LoadingState.Processing;
      this.invoiceService.getInvoiceListByPurchaseInvId(id).subscribe(res => {
        this.invoiceList = res;
        //console.log(this.invoiceList)
        this.invoice_details_key = true;
        this.Search_invoice_list_key = false;
        this.loading = LoadingState.Ready;
      })
    }
    else {
      this.getInvoiceList();
    }
  }

  //selectall
  toggleAll(val) {
    if (val.target.checked) {
      this.invoiceList.forEach((invoice) => {
        invoice.checked = true;
        if (invoice.is_approve == '0') {
          var d = {
            cust_id: invoice.customer_details.id,
            pur_id: invoice.id
          }

        }
        this.selectedCustomer.push(d)
      });
      //console.log("sss"+this.selectedCustomer[0]);
      //console.log(JSON.parse(JSON.stringify(this.selectedCustomer)))
    }
    else {
      this.invoiceList.forEach((invoice) => {
        invoice.checked = false;
        let index = this.selectedCustomer.indexOf(invoice);
        this.selectedCustomer.splice(index, 1);
      });
    }
  }
  //select one by one
  invoiceCheck(val, invoice, purInvId) {
    if (val.target.checked) {
      var d = {
        cust_id: invoice,
        pur_id: purInvId
      }
      this.selectedCustomer.push(d);
    }
    else {
      let index = this.selectedCustomer.indexOf(invoice);
      this.selectedCustomer.splice(index, 1);
    }
    // console.log(this.selectedCustomer);
  }

  //send mail to all checked
  sendMailByAllInvoice(e) {
    if (this.selectedCustomer.length > 0) {
      this.invoiceService.sendMailByAllInvoice(this.selectedCustomer).subscribe(
        response => {
          // console.log(response)
          this.toastr.success('Send Mail successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          //this.goToList('purchase-orders');
        },
        error => {
          this.loading = LoadingState.Ready;
          this.toastr.error('Something went wrong', '', {
            timeOut: 3000,
          });
        }
      );
    }
    else {
      this.toastr.error('please check one', '', {
        timeOut: 3000,
      });
    }
  }

  //search data
  search() {
    this.getInvoiceList();
  }

  dConvert(n) {
    return n < 10 ? "0" + n : n;
  }
  

}
