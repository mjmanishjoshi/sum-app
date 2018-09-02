import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  {
    path: ':accid/layout/:layoutid',
    component: AccountComponent,
    children: [
      { path: '', redirectTo: 'main' },
      { path: 'main', component: MainComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
