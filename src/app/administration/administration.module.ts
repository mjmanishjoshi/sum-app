import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatSidenavModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';

import { AdministrationRoutingModule } from './administration-routing.module';
import { HomeComponent } from './home/home.component';
import { ConsoleComponent } from './console/console.component';
import { AccountComponent } from './account/account.component';
import { DetailsComponent } from './details/details.component';
import { MembersComponent } from './members/members.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    AdministrationRoutingModule
  ],
  declarations: [HomeComponent, ConsoleComponent, AccountComponent, DetailsComponent, MembersComponent],
  entryComponents: [DetailsComponent]
})
export class AdministrationModule { }
