import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingState } from '../../core/component/loading/loading.component';
import { ApprovalInvoiceService } from '../../core/services/approval-invoice.service';
import { CustomerService } from '../../core/services/customer.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { ToastrService } from 'ngx-toastr';
import * as Globals from '../../core/globals';

@Component({
  selector: 'app-approval-invoice',
  templateUrl: './approval-invoice.component.html',
  styleUrls: ['./approval-invoice.component.scss']
})
export class ApprovalInvoiceComponent implements OnInit {

  loading: LoadingState = LoadingState.NotReady;
  totalApprovalInvoiceList: number;
  approvalInvoiceList: any = [];
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  itemNo: number;
  defaultPagination: number;
  selectedAll: boolean;
  selectedInvoice: any = [];
  customer_list: any = [];
  approve_invoice_list: any = [];
  approve_invoice_details: any;
  customer = 0;
  date: any;
  invoice_details_key: boolean;
  Search_invoice_list_key: boolean;
  constructor(
    private approvalInvoiceService: ApprovalInvoiceService,
    private router: Router,
    private toastr: ToastrService,
    private customerService: CustomerService,
    private invoiceService: InvoiceService
  ) { }

  ngOnInit() {
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getApproveInvoiceList();
    this.getCustomerList();
  }

  getApproveInvoiceList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    if (this.customer > 0) {
      params.set('customer_id', this.customer.toString());
    }
    if (this.date != undefined) {
      var frDate = new Date(this.date.year, this.date.month - 1, this.date.day)
      params.set('created_date', frDate.getFullYear() + "-" + this.dConvert(frDate.getMonth() + 1) + "-" + this.dConvert(frDate.getDate()));
    }
    this.approvalInvoiceService.getApproveInvoiceList(params).subscribe(
      (data: any[]) => {
        this.totalApprovalInvoiceList = data['count'];
        this.approvalInvoiceList = data['results'];
        // console.log(this.approvalInvoiceList);
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.totalApprovalInvoiceList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalApprovalInvoiceList
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
  }

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
      this.approve_invoice_list = [];
      this.approvalInvoiceService.getApproveInvoiceListByCustomerId(id).subscribe(res => {
        this.approve_invoice_list = res;
        this.loading = LoadingState.Ready;
      })
    }
    else {
      this.approve_invoice_list = [];
      this.getApproveInvoiceList();
    }

  }

  invoiceChange(id) {
    if (id > 0) {
      this.loading = LoadingState.Processing;
      this.invoiceService.getInvoiceDetailsByPurchaseInvId(id).subscribe(res => {
        this.approve_invoice_details = res;
        this.invoice_details_key = true;
        this.Search_invoice_list_key = false;
        this.loading = LoadingState.Ready;
      })
    }
    else {
      this.getApproveInvoiceList();
    }
  }

  toggleAll(val) {
    if (val.target.checked) {
      this.selectedAll = true
      this.approvalInvoiceList.forEach((invoice) => {
        if (invoice.checked == false || invoice.checked == undefined) {
          invoice.checked = true;
        }
        var d = {
          cust_id: invoice.customer_details.id,
          pur_id: invoice.id,
          approve: 0
        }
        var Mindex = this.selectedInvoice.findIndex(p => p.pur_id == invoice.id)
        if (Mindex == -1) {
          this.selectedInvoice.push(d)
        }
      });
    }
    else {
      this.selectedAll = false
      this.approvalInvoiceList.forEach((invoice) => {
        invoice.checked = false;
        var Mindex = this.selectedInvoice.findIndex(p => p.pur_id == invoice.id)
        if (Mindex != -1) {
          this.selectedInvoice.splice(Mindex, 1);
        }
      });
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
        approve: 0
      }
      var Mindex = this.selectedInvoice.findIndex(p => p.pur_id == invoice_id)
      if (Mindex == -1) {
        this.selectedInvoice.push(d);
      }
      var filterList = []
      filterList = this.approvalInvoiceList.filter(x => x.is_approve == 0)
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

  approve(customer_id, invoice_id) {
    this.loading = LoadingState.Processing;
    var data = [
      {
        cust_id: customer_id,
        pur_id: invoice_id,
        approve: 2
      }
    ]
    this.approveDiss_approveStatus(data)
  }

  reject(customer_id, invoice_id) {
    this.loading = LoadingState.Processing;
    var data = [
      {
        cust_id: customer_id,
        pur_id: invoice_id,
        approve: 3
      }
    ]
    this.approveDiss_approveStatus(data)
  }

  bulk_approve() {
    this.loading = LoadingState.Processing
    if (this.selectedInvoice.length == 0) {
      this.loading = LoadingState.Ready
      this.toastr.error('please check at least one', '', {
        timeOut: 3000,
      });
    }
    else {
      var data = [];
      this.selectedInvoice.forEach(x => {
        var d = {
          cust_id: x.cust_id,
          pur_id: x.pur_id,
          approve: 2
        }
        data.push(d)
      })
      this.approveDiss_approveStatus(data)
    }
  }

  bulk_reject() {
    this.loading = LoadingState.Processing
    if (this.selectedInvoice.length == 0) {
      this.loading = LoadingState.Ready
      this.toastr.error('please check at least one', '', {
        timeOut: 3000,
      });
    }
    else {
      var data = [];
      this.selectedInvoice.forEach(x => {
        var d = {
          cust_id: x.cust_id,
          pur_id: x.pur_id,
          approve: 3
        }
        data.push(d)
      })
      this.approveDiss_approveStatus(data)
    }
  }

  changeStatus(val, customer_id, invoice_id) {
    this.loading = LoadingState.Processing;
    var data = [
      {
        cust_id: customer_id,
        pur_id: invoice_id,
        approve: 0
      }
    ]
    if (val == 2) {
      data[0].approve = 2
    }
    else if (val == 3) {
      data[0].approve = 3
    }
    this.approveDiss_approveStatus(data)
  }

  approveDiss_approveStatus(data) {
    this.approvalInvoiceService.changeApproveDissapproveStatus(data).subscribe(
      response => {
        this.toastr.success('Status changed successfully', '', {
          timeOut: 3000,
        });
        this.getApproveInvoiceList();
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
    this.getApproveInvoiceList();
  }

  pagination() {
    this.loading = LoadingState.Processing;
    this.getApproveInvoiceList();
  };

  dConvert(n) {
    return n < 10 ? "0" + n : n;
  }

}
