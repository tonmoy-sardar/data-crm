import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ApprovalInvoiceRoutingModule } from './approval-invoice-routing.module';
import { ApprovalInvoiceComponent } from './approval-invoice.component';

import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    ApprovalInvoiceRoutingModule,
    CoreModule
  ],
  declarations: [ApprovalInvoiceComponent]
})
export class ApprovalInvoiceModule { }
