import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './authorization/authorization.module#AuthorizationModule'
  },
  {
    path: 'admin',
    loadChildren: './administration/administration.module#AdministrationModule'
  },
  {
    path: 'open',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
