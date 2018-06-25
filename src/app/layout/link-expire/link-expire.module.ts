import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinkExpireRoutingModule } from './link-expire-routing.module';
import { LinkExpireComponent } from './link-expire.component';

import {CoreModule} from "../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    LinkExpireRoutingModule,
    CoreModule
  ],
  declarations: [LinkExpireComponent]
})
export class LinkExpireModule { }
