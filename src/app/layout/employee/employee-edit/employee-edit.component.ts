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
  loading: LoadingState = LoadingState.NotReady;
  employee_details: any;
  constructor(
    private employeesService: EmployeesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
    this.employee_details = {
      first_name: '',
      last_name: '',
      email: '',
      employee_profile: [
        {
          contact_no: '',
          address: '',
          state: '',
          city: '',
          pin_code: ''
        }
      ]
    }
    this.form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: [{ value: null, disabled: true }],
      employee_profile: this.formBuilder.array([this.create_employee_profile()])
    });
    this.getEmployeeDetails(this.route.snapshot.params['id']);

  }

  getEmployeeDetails(id) {
    this.employeesService.getEmployeeDetails(id).subscribe(res => {
      this.employee_details = res;
      console.log(res)
      this.loading = LoadingState.Ready;
    },
      error => {
        this.loading = LoadingState.Ready;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      })
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

  updateEmployee() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing;
      // console.log(this.form.value)
      this.employeesService.updateEmployee(this.employee_details).subscribe(
        response => {
          this.toastr.success('Employee updated successfully', '', {
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
