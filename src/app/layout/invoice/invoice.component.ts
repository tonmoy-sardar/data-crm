import { Component, OnInit } from '@angular/core';
import { LoadingState } from '../../core/component/loading/loading.component';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  loading: LoadingState = LoadingState.NotReady;
  constructor() { }

  ngOnInit() {
    this.loading = LoadingState.Ready;
  }

}
