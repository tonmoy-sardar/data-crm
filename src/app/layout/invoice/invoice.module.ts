import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';

import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    CoreModule
  ],
  declarations: [InvoiceComponent]
})
export class InvoiceModule { }
