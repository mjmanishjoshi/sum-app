import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConsoleComponent } from './console/console.component';
import { AccountComponent } from './account/account.component';
import { MembersComponent } from './members/members.component';

const routes: Routes = [
  {
    path: '',
    component: ConsoleComponent,
    children: [
      { path: '', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      {
        path: 'account/:accid', component: AccountComponent, children: [
          { path: '', redirectTo: 'members' },
          { path: 'members', component: MembersComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
