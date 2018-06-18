import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingState } from '../../core/component/loading/loading.component';
import { InvoiceService } from '../../core/services/invoice.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  loading: LoadingState = LoadingState.NotReady;

  invoiceList = [];
  defaultPagination: number;

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.defaultPagination = 1;
    this.getInvoiceList();
  }


  getInvoiceList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    this.invoiceService.getInvoiceList(params).subscribe(
      (data: any[]) => {
        this.invoiceList = data['results'];
        console.log(this.invoiceList)
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
}
