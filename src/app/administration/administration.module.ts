import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSidenavModule,
  MatButtonModule
} from '@angular/material';

import { AdministrationRoutingModule } from './administration-routing.module';
import { HomeComponent } from './home/home.component';
import { ConsoleComponent } from './console/console.component';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    AdministrationRoutingModule
  ],
  declarations: [HomeComponent, ConsoleComponent]
})
export class AdministrationModule { }
