import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';

import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CoreModule
  ],
  declarations: [CustomerComponent]
})
export class CustomerModule { }
