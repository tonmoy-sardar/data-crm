import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

import {CoreModule} from "../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    CoreModule
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
