import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingState } from '../../core/component/loading/loading.component';
import { InvoiceService } from '../../core/services/invoice.service';
import { CustomerService } from '../../core/services/customer.service';
import { ToastrService } from 'ngx-toastr';
import * as Globals from '../../core/globals';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  loading: LoadingState = LoadingState.NotReady;
  totalInvoiceList: number;
  invoiceList: any = [];
  invoice_details: any;
  lower_count: number;
  upper_count: number;
  defaultPagination: number;
  paginationMaxSize: number;
  itemPerPage: number;
  itemNo: number;
  selectedAll: boolean;
  selectedInvoice: any = [];
  customer_list: any = [];
  invoice_list: any = [];
  customer = 0;
  status = '';
  date: any;
  invoice_details_key: boolean;
  Search_invoice_list_key: boolean;

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private toastr: ToastrService,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
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
        if (this.totalInvoiceList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalInvoiceList
        }
        this.invoice_details_key = false;
        this.Search_invoice_list_key = true;
        this.selectedAll = false;
        this.selectedInvoice = [];
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
    this.customerService.getCustomerListtWithoutPagination().subscribe(res => {
      this.customer_list = res;
      this.loading = LoadingState.Ready;
    },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      })
  }

  customerChange(id) {
    this.loading = LoadingState.Processing;
    if (id > 0) {
      this.invoice_list = [];
      this.invoiceService.getInvoiceListByCustomerId(id).subscribe(res => {
        this.invoice_list = res;
        this.loading = LoadingState.Ready;
      })
    }
    else {
      this.invoice_list = [];
      this.getInvoiceList();
    }

  }

  invoiceChange(id) {
    if (id > 0) {
      this.loading = LoadingState.Processing;
      this.invoiceService.getInvoiceDetailsByPurchaseInvId(id).subscribe(res => {
        this.invoice_details = res;
        this.invoice_details_key = true;
        this.Search_invoice_list_key = false;
        this.loading = LoadingState.Ready;
      })
    }
    else {
      this.getInvoiceList();
    }
  }

  toggleAll(val) {
    if (val.target.checked) {
      this.selectedAll = true
      this.invoiceList.forEach((invoice) => {
        if (invoice.is_approve == 0) {
          if (invoice.checked == false || invoice.checked == undefined) {
            invoice.checked = true;
          }
          var d = {
            cust_id: invoice.customer_details.id,
            pur_id: invoice.id,
            approve: 1
          }
          var Mindex = this.selectedInvoice.findIndex(p => p.pur_id == invoice.id)
          if (Mindex == -1) {
            this.selectedInvoice.push(d)
          }
        }
      });
    }
    else {
      this.selectedAll = false
      this.invoiceList.forEach((invoice) => {
        invoice.checked = false;
        var Mindex = this.selectedInvoice.findIndex(p => p.pur_id == invoice.id)
        if (Mindex != -1) {
          this.selectedInvoice.splice(Mindex, 1);
        }
      });
      //console.log(JSON.parse(JSON.stringify(this.selectedInvoice)))
    }
  }

  invoiceCheck(val, customer_id, invoice_id, invoice) {
    if (val.target.checked) {
      if (invoice.checked == false || invoice.checked == undefined) {
        invoice.checked = true;
      }
      var d = {
        cust_id: customer_id,
        pur_id: invoice_id,
        approve: 1
      }
      var Mindex = this.selectedInvoice.findIndex(p => p.pur_id == invoice_id)
      if (Mindex == -1) {
        this.selectedInvoice.push(d);
      }
      var filterList = []
      filterList = this.invoiceList.filter(x => x.is_approve == 0)
      if (filterList.length == this.selectedInvoice.length) {
        this.selectedAll = true
      }
    }
    else {
      invoice.checked = false;
      var Mindex = this.selectedInvoice.findIndex(p => p.pur_id == invoice_id)
      if (Mindex != -1) {
        this.selectedInvoice.splice(Mindex, 1);
        this.selectedAll = false
      }
    }
  }

  sendMail(customer_id, invoice_id) {
    this.loading = LoadingState.Processing;
    var data = [
      {
        cust_id: customer_id,
        pur_id: invoice_id,
        approve: 1
      }
    ]
    this.mailToAdmin(data)
  }

  bulkMailSend() {
    this.loading = LoadingState.Processing
    if (this.selectedInvoice.length == 0) {
      this.loading = LoadingState.Ready
      this.toastr.error('please check at least one', '', {
        timeOut: 3000,
      });
    }
    else {
      this.mailToAdmin(this.selectedInvoice)
    }
  }

  mailToAdmin(data) {
    this.invoiceService.sendMailByAllInvoice(data).subscribe(
      response => {
        this.toastr.success('Approval request sent successfully', '', {
          timeOut: 3000,
        });
        this.getInvoiceList();
      },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  }

  dataSearch() {
    this.defaultPagination = 1;
    this.loading = LoadingState.Processing;
    this.getInvoiceList();
  }

  pagination() {
    this.loading = LoadingState.Processing;
    this.getInvoiceList();
  };

  dConvert(n) {
    return n < 10 ? "0" + n : n;
  }


}
