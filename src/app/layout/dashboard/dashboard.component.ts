import { Component, OnInit } from '@angular/core';
import { LoadingState } from '../../core/component/loading/loading.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading: LoadingState = LoadingState.NotReady;
  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loading = LoadingState.Ready;
  }

  showSuccess() {
    this.toastr.success('Hello world!', '', {
      timeOut: 3000,
    });
  }

}
