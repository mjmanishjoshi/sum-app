import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatGridListModule,
  MatExpansionModule,
  MatButtonModule,
  MatToolbarModule,
  MatSelectModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule
} from '@angular/material';
import { DragulaModule } from 'ng2-dragula';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { TileDirective } from './tile.directive';
import { AccountComponent } from './account/account.component';
import { LayoutComponent } from './layout/layout.component';
import { EditLayoutComponent } from '../dashboard/edit-layout/edit-layout.component';
import { DndModule } from 'ng2-dnd';

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
    MatSidenavModule,
    MatListModule,
    DragulaModule,
    DndModule,
    DashboardRoutingModule
  ],
  declarations: [MainComponent, AccountComponent, LayoutComponent, TileDirective, EditLayoutComponent]
})
export class DashboardModule { }
