import { NgModule } from '@angular/core';
import { RouterModule, Routes,CanActivate } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApiCallService } from './api-call.service';
import { ViewListComponent } from './view-list/view-list.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,canActivate:[ApiCallService]},
  {path:'', component: AppComponent},
  {path:'viewlist',component:ViewListComponent,canActivate:[ApiCallService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }