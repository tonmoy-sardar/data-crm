import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingState } from '../../core/component/loading/loading.component';
import { CustomerService } from '../../core/services/customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customerList = [];
  defaultPagination: number;
  totalCustomerList: number;
  search_key = '';
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  itemNo: number;
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.defaultPagination = 1;
    this.itemNo = 0;
    this.itemPerPage=10;
    this.getCustomerList();
  }

  dataSearch() {
    //console.log('sss');
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getCustomerList();
  }

  getCustomerList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    if (this.search_key != '') {
      params.set('search', this.search_key.toString());
    }
    this.customerService.getCustomerList(params).subscribe(
      (data: any[]) => {
        this.totalCustomerList = data['count'];
        this.customerList = data['results'];
        //console.log(this.customerList)
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        //console.log(this.lower_count)
        if (this.totalCustomerList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalCustomerList
        }
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
