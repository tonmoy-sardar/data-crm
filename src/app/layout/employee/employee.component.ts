import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeesService } from '../../core/services/employees.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingState } from '../../core/component/loading/loading.component';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employeeList = [];
  defaultPagination: number;
  totalEmployeeList: number;
  search_key = '';
  lower_count: number;
  upper_count: number;
  itemNo: number;
  itemPerPage: number;
  loading: LoadingState = LoadingState.NotReady;

  constructor(
    private employeesService: EmployeesService,
    private router: Router,
    private toastr: ToastrService
 
  ) { }

  ngOnInit() {
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.loading = LoadingState.Ready;
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
        // console.log(data)
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
