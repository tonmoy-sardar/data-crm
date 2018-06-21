import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovalInvoiceComponent } from './approval-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: ApprovalInvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalInvoiceRoutingModule { }
