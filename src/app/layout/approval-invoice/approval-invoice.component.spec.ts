import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalInvoiceComponent } from './approval-invoice.component';

describe('ApprovalInvoiceComponent', () => {
  let component: ApprovalInvoiceComponent;
  let fixture: ComponentFixture<ApprovalInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
