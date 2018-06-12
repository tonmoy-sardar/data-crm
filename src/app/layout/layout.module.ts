import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

import {CoreModule} from "../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    CoreModule
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule { }