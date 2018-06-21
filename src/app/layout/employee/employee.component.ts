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
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private customerService: EmployeesService,
    private router: Router,
    private toastr: ToastrService
 
  ) { }

  ngOnInit() {
  }

}
