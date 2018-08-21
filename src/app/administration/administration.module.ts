import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSidenavModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AdministrationRoutingModule } from './administration-routing.module';
import { HomeComponent } from './home/home.component';
import { ConsoleComponent } from './console/console.component';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    AdministrationRoutingModule
  ],
  declarations: [HomeComponent, ConsoleComponent]
})
export class AdministrationModule { }
