import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

import { LoadingState } from '../../core/component/loading/loading.component';
import { ApprovalInvoiceService } from '../../core/services/approval-invoice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-approval-invoice',
  templateUrl: './approval-invoice.component.html',
  styleUrls: ['./approval-invoice.component.scss']
})
export class ApprovalInvoiceComponent implements OnInit {
  
  loading: LoadingState = LoadingState.NotReady;
  totalApprovalInvoiceList: number;
  approvalInvoiceList = [];
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  itemNo: number;
  defaultPagination: number;
  status :'';
  selectedAll: any;
  selectedCustomer : any[];
  constructor(
    private approvalInvoiceService: ApprovalInvoiceService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.selectedCustomer = []
    this.status ='';
    this.defaultPagination = 1;
    this.itemNo = 0;
    this.itemPerPage=10;
    this.getApproveInvoiceList();
  }

  getApproveInvoiceList()
  {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    this.approvalInvoiceService.getApproveInvoiceList(params).subscribe(
      (data: any[]) => {
        this.totalApprovalInvoiceList = data['count'];
        this.approvalInvoiceList = data['results'];
        console.log(this.approvalInvoiceList);
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        //console.log(this.lower_count)
        if (this.totalApprovalInvoiceList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalApprovalInvoiceList
        }
        //this.invoice_details_key = false;
        //this.Search_invoice_list_key = true;
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
  
  //selectall
  toggleAll(val)
  {
    if(val.target.checked){
        this.approvalInvoiceList.forEach((invoice) => {
        invoice.checked = true;
        var d = {
          cust_id: invoice.customer_details.id,
          pur_id: invoice.id
        }
        this.selectedCustomer.push(d)
      });
      
    }
    else{
        this.approvalInvoiceList.forEach((invoice) => {
        invoice.checked = false;
        let index = this.selectedCustomer.indexOf(invoice);
        this.selectedCustomer.splice(index, 1);
      });
    }
    console.log(this.selectedCustomer);
  }
  //select one by one
  invoiceCheck(val, invoice,purInvId) {
    if(val.target.checked)
    {
      var d = {
        cust_id: invoice,
        pur_id: purInvId,
        approve :''
      }
      this.selectedCustomer.push(d);
      
    }
    else{
      let index = this.selectedCustomer.indexOf(invoice);
      this.selectedCustomer.splice(index, 1);
    }
  }

  sendMailByAllInvoiceApproval(e,appVal){
  if(this.selectedCustomer.length>0){
    for (let i = 0; i < this.selectedCustomer.length ; i++) {
      if(this.selectedCustomer[i].approve==undefined)
      {
        this.selectedCustomer[i].approve=appVal;
      }
    }
    //console.log("fnl"+this.selectedCustomer[0].pur_id);
    this.approvalInvoiceService.sendMailByAllInvoiceApproval(this.selectedCustomer).subscribe(
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
   else{
    this.toastr.error('please check one', '', {
      timeOut: 3000,
    });
   }
}

changeApproveStatus(value, id) {
  if(value > 0) {
    this.loading = LoadingState.Processing;
    let approveInvoice;

    approveInvoice = {
      id: id,
      is_approve: value
    };

    this.approvalInvoiceService.changeApproveStatusApproveInvoice(approveInvoice).subscribe(
      response => {
        this.toastr.success('Purchase Requisition approve status changed successfully', '', {
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

}

}
