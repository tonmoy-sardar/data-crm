import { Component, OnInit } from '@angular/core';
import { LoadingState } from '../core/component/loading/loading.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading: LoadingState = LoadingState.NotReady;
  constructor() { }

  ngOnInit() {
    this.loading = LoadingState.Ready;
  }

}
