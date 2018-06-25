import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeesService } from '../../../core/services/employees.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingState } from '../../../core/component/loading/loading.component';


@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {

  form: FormGroup;
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private employeesService: EmployeesService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
 
  ) { }

  ngOnInit() {
    this.loading = LoadingState.Ready;
    this.form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]],
      employee_profile: this.formBuilder.array([this.create_employee_profile()])
    });

    
  }

  create_employee_profile() {
    return this.formBuilder.group({
      contact_no: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(12)
      ]],
      address: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pin_code: ['', [Validators.required]],
    });
  }

  getEmployeeProfile(form) {
    return form.get('employee_profile').controls
  }

  goToList(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  reSet() {
    this.form.reset();
  }

  addEmployee() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      // console.log(this.form.value)
      this.employeesService.addNewEmployee(this.form.value).subscribe(
        response => {
          this.toastr.success('Employee added successfully', '', {
            timeOut: 3000,
          });
          this.loading = LoadingState.Ready;
          this.goToList('employees');
        },
        error => {
          this.loading = LoadingState.Ready;
          this.toastr.error('Something went wrong', '', {
            timeOut: 3000,
          });
        }
      );
    } else {
      this.markFormGroupTouched(this.form)
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

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
