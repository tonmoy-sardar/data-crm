import { TestBed, inject } from '@angular/core/testing';

import { ApprovalInvoiceService } from './approval-invoice.service';

describe('ApprovalInvoiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApprovalInvoiceService]
    });
  });

  it('should be created', inject([ApprovalInvoiceService], (service: ApprovalInvoiceService) => {
    expect(service).toBeTruthy();
  }));
});
