import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportingComponent } from './reporting/reporting.component';


const  routes:  Routes  = [
  { path:  '', redirectTo:  'home', pathMatch:  'full'},
  { path:  'home', component:  ReportingComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
