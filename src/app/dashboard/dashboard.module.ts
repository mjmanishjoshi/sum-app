import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatGridListModule,
  MatExpansionModule,
  MatButtonModule,
  MatToolbarModule,
  MatSelectModule
} from '@angular/material';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    MatExpansionModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    DashboardRoutingModule
  ],
  declarations: [MainComponent]
})
export class DashboardModule { }
