import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';

// core
import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    CoreModule
  ],
  declarations: [EmployeeComponent, EmployeeAddComponent, EmployeeEditComponent]
})
export class EmployeeModule { }
