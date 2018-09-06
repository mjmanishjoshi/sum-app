import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AccountComponent } from './account/account.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    pathMatch: 'full'
  },
  {
    path: ':accid',
    component: AccountComponent,
    children: [
      { path: '', redirectTo: 'layout', pathMatch: 'full' },
      { path: 'layout', component: LayoutComponent, pathMatch: 'full' },
      {
        path: 'layout/:layoutid',
        component: LayoutComponent,
        children: [
          { path: '', redirectTo: 'main' },
          { path: 'main', component: MainComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
