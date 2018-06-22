import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeesService } from '../../../core/services/employees.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { LoadingState } from '../../../core/component/loading/loading.component';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {
  form: FormGroup;
  employee_details: any;
  loading: LoadingState = LoadingState.NotReady;

  constructor(
   
    private employeesService: EmployeesService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    
    
  ) { }

  ngOnInit() {
    this.loading = LoadingState.Ready;
    this.employee_details = {
      first_name: '',
      last_name: '',
      email:'',
      contact: '',
      dob: '',
      emp_present_address: '',
      emp_present_state: '',
      emp_present_city: '',
      emp_present_pin: '',
  }
  this.form = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [
      Validators.required,
      Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    ]],
    contact: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(12)
    ]],
    dob: ['', Validators.required],
    emp_present_address: ['', Validators.required],
    emp_present_state: ['', Validators.required],
    emp_present_city: ['', Validators.required],
    emp_present_pin: ['', Validators.required],
  });
}

getEmployeeDetails(id){
  // this.employeesService.getEmployeeDetails(id).subscribe(res => {
  //   this.employee_details = res;
  //   // console.log(res)
  //   var date = new Date(this.employee_details.dob)
  //   this.employee_details.dob = {
  //     year: date.getFullYear(),
  //     month: date.getMonth() + 1,
  //     day: date.getDate()
  //   }
  //   this.loading = LoadingState.Ready;
  // },
  // error => {
  //   this.loading = LoadingState.Ready;
  //   this.toastr.error('Something went wrong', '', {
  //     timeOut: 3000,
  //   });
  // })
}


updateEmployee() {
  if (this.form.valid) {
    this.loading = LoadingState.Processing;
    // var date = new Date(this.form.value.dob.year, this.form.value.dob.month - 1, this.form.value.dob.day)
    
    // this.employee_details.dob = date.toISOString();
    // // console.log(this.form.value)
    // this.employeesService.updateEmployee(this.employee_details).subscribe(
    //   response => {
    //     this.toastr.success('Employee updated successfully', '', {
    //       timeOut: 3000,
    //     });
    //     this.loading = LoadingState.Ready;
    //     this.goToList('employees');
    //   },
    //   error => {
    //     this.loading = LoadingState.Ready;
    //     this.toastr.error('Something went wrong', '', {
    //       timeOut: 3000,
    //     });
    //   }
    // );
  } else {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}

reSet() {
  this.form.reset();
}

isFieldValid(field: string) {
  return !this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched);
}

displayFieldCss(field: string) {
  return {
    'is-invalid': this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched),
    'is-valid': this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched)
  };
}

}
