import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import {CoreModule} from "../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    CoreModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
