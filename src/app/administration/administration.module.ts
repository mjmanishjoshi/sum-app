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
  MatToolbarModule,
  MatTableModule
} from '@angular/material';

import { AdministrationRoutingModule } from './administration-routing.module';
import { HomeComponent } from './home/home.component';
import { ConsoleComponent } from './console/console.component';
import { AccountComponent } from './account/account.component';
import { DetailsComponent } from './details/details.component';
import { MembersComponent } from './members/members.component';
import { MemberDetailsComponent } from './member-details/member-details.component';

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
    MatTableModule,
    AdministrationRoutingModule
  ],
  declarations: [HomeComponent, ConsoleComponent, AccountComponent, DetailsComponent, MembersComponent, MemberDetailsComponent],
  entryComponents: [DetailsComponent, MemberDetailsComponent]
})
export class AdministrationModule { }
