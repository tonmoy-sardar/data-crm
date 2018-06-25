import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingState } from '../../core/component/loading/loading.component';
import { CustomerService } from '../../core/services/customer.service';
import { ToastrService } from 'ngx-toastr';
import * as Globals from '../../core/globals';

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
  sort_by = '';
  sort_type = '';
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  itemNo: number;
  loading: LoadingState = LoadingState.NotReady;
  headerThOption = [];
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.headerThOption = [
      {
        name: "Customer Name",
        code: "name",
        sort_type: ''
      },
      {
        name: "Address",
        code: "address",
        sort_type: ''
      },
      {
        name: "DOB",
        code: "dob",
        sort_type: ''
      },
      {
        name: "Email",
        code: "email",
        sort_type: ''
      },
      {
        name: "Contact",
        code: "contact",
        sort_type: ''
      },
      {
        name: "Alt Contact",
        code: "alt_contact",
        sort_type: ''
      }
    ];
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getCustomerList();
  }

  dataSearch() {
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getCustomerList();
  }

  pagination() {
    this.loading = LoadingState.Processing;
    this.getCustomerList();
  };
  sortTable(value) {
    let type = '';
    this.headerThOption.forEach(function (optionValue) {
      if (optionValue.code == value) {
        if (optionValue.sort_type == 'desc') {
          type = 'asc';
        }
        else {
          type = 'desc';
        }
        optionValue.sort_type = type;
      }
      else {
        optionValue.sort_type = '';
      }
    });

    this.sort_by = value;
    this.sort_type = type;
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getCustomerList();
  };

  getCustomerList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    if (this.search_key != '') {
      params.set('search', this.search_key.toString());
    }
    if (this.sort_by != '') {
      params.set('field_name', this.sort_by.toString());
    }

    if (this.sort_type != '') {
      params.set('order_by', this.sort_type.toString());
    }
    this.customerService.getCustomerList(params).subscribe(
      (data: any[]) => {
        this.totalCustomerList = data['count'];
        this.customerList = data['results'];
        //console.log(this.customerList)
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
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
