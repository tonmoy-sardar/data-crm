import { Component, OnInit } from '@angular/core';
import { LoadingState } from '../../core/component/loading/loading.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  loading: LoadingState = LoadingState.NotReady;
  constructor() { }

  ngOnInit() {
    this.loading = LoadingState.Ready;
  }

}
