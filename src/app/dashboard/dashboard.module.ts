import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatGridListModule,
  MatExpansionModule,
  MatButtonModule,
  MatToolbarModule,
  MatSelectModule,
  MatIconModule,
  MatMenuModule
} from '@angular/material';
import { DragulaModule } from 'ng2-dragula';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { TileDirective } from './tile.directive';
import { AccountComponent } from './account/account.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    MatExpansionModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    DragulaModule,
    DashboardRoutingModule
  ],
  declarations: [MainComponent, AccountComponent, LayoutComponent, TileDirective]
})
export class DashboardModule { }
