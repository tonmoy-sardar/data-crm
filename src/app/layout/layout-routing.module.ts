import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'customers', loadChildren: './customer/customer.module#CustomerModule' },
      { path: 'invoices', loadChildren: './invoice/invoice.module#InvoiceModule' },
      { path: 'employee', loadChildren: './employee/employee.module#EmployeeModule' },
      {
        path: 'approval-invoice',
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['admin'],
            redirectTo: '/dashboard'
          }
        },
        loadChildren: './approval-invoice/approval-invoice.module#ApprovalInvoiceModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
