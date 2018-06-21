import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// directive
import { OnlyNumberDirective } from './directive/only-number.directive';

// guard
import { AuthGuard } from './guard/auth.guard';

// services
import { LoginService } from './services/login.service';
import { CustomerService } from './services/customer.service';
import { InvoiceService } from './services/invoice.service';
import { ApprovalInvoiceService } from './services/approval-invoice.service';

// Material
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
  MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, 
  MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
  MatProgressBarModule, MatProgressSpinnerModule,MatStepperIntl, MatRadioModule, MatRippleModule, MatSelectModule,
  MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule,
  MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatStepperModule,
} from '@angular/material';

// component
import { HeaderComponent } from './component/header/header.component';
import { LoadingComponent } from './component/loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    //----------------Material----------------//
    MatAutocompleteModule,MatButtonModule,MatButtonToggleModule,
    MatCardModule,MatCheckboxModule,MatChipsModule,MatStepperModule,MatDatepickerModule,
    MatDialogModule,MatExpansionModule,MatGridListModule,MatIconModule,MatInputModule,MatListModule,
    MatMenuModule,MatNativeDateModule,MatPaginatorModule,MatProgressBarModule,
    MatProgressSpinnerModule,MatRadioModule,MatRippleModule,MatSelectModule,MatSidenavModule,
    MatSliderModule,MatSlideToggleModule,MatSnackBarModule,MatSortModule,MatTableModule,
    MatTabsModule,MatToolbarModule,MatTooltipModule,
    //----------------Material----------------//
  ],
  declarations: [
    OnlyNumberDirective,
    HeaderComponent,
    LoadingComponent
  ],
  exports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    //----------------Material----------------//
    MatAutocompleteModule,MatButtonModule,MatButtonToggleModule,
    MatCardModule,MatCheckboxModule,MatChipsModule,MatStepperModule,MatDatepickerModule,
    MatDialogModule,MatExpansionModule,MatGridListModule,MatIconModule,MatInputModule,MatListModule,
    MatMenuModule,MatNativeDateModule,MatPaginatorModule,MatProgressBarModule,
    MatProgressSpinnerModule,MatRadioModule,MatRippleModule,MatSelectModule,MatSidenavModule,
    MatSliderModule,MatSlideToggleModule,MatSnackBarModule,MatSortModule,MatTableModule,
    MatTabsModule,MatToolbarModule,MatTooltipModule,
    //----------------Material----------------//
    OnlyNumberDirective,
    HeaderComponent,
    LoadingComponent
  ],
  entryComponents: [
    
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthGuard,
        LoginService,
        CustomerService,
        InvoiceService,
        ApprovalInvoiceService
      ]
    };
  }
}
