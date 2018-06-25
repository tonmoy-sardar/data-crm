import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeesService } from '../../core/services/employees.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingState } from '../../core/component/loading/loading.component';
import * as Globals from '../../core/globals';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employeeList: any = [];
  defaultPagination: number;
  totalEmployeeList: number;
  search_key = '';
  sort_by = '';
  sort_type = '';
  lower_count: number;
  upper_count: number;
  itemNo: number;
  itemPerPage: number;
  paginationMaxSize: number;
  loading: LoadingState = LoadingState.NotReady;
  headerThOption = [];

  constructor(
    private employeesService: EmployeesService,
    private router: Router,
    private toastr: ToastrService

  ) { }

  ngOnInit() {
    this.headerThOption = [
      {
        name: "First Name",
        code: "first_name",
        sort_type: ''
      },
      {
        name: "Last Name",
        code: "last_name",
        sort_type: ''
      },
      {
        name: "Email",
        code: "email",
        sort_type: ''
      },
      {
        name: "Contact",
        code: "contact_no",
        sort_type: ''
      },
      {
        name: "Address",
        code: "address",
        sort_type: ''
      },
      {
        name: "state",
        code: "state",
        sort_type: ''
      },
      {
        name: "City",
        code: "city",
        sort_type: ''
      },
      {
        name: "Pin Code",
        code: "pin_code",
        sort_type: ''
      }
    ];
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getEmployeeList();
  }

  dataSearch() {
    this.loading = LoadingState.Processing;
    this.defaultPagination = 1;
    this.getEmployeeList();
  }

  btnClickNav = function (toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  getEmployeeList() {
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
    this.employeesService.getEmployeeList(params).subscribe(
      (data: any[]) => {
        this.totalEmployeeList = data['count'];
        this.employeeList = data['results'];
        // console.log(this.employeeList)
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.totalEmployeeList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalEmployeeList
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

  pagination() {
    this.loading = LoadingState.Processing;
    this.getEmployeeList();
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
    this.getEmployeeList();
  };



}
