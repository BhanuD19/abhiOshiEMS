import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { NewEmployeeComponent } from './employee/new-employee/new-employee.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { EditEmployeeResolver } from './employee/edit-employee/edit-employee.resolver';
import { RouteGuardService } from './services/route-guard.service';
import { from } from 'rxjs';
import { LoginComponent } from './shared/login/login.component';
import { PayslipGenComponent } from './employee/payslip-gen/payslip-gen.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [RouteGuardService]},
  { path: 'new', component: NewEmployeeComponent, canActivate: [RouteGuardService] },
  { path: 'payslip/:id', component: PayslipGenComponent, resolve: {data: EditEmployeeResolver} },
  { path: 'details/:id', component: EditEmployeeComponent, resolve:{data : EditEmployeeResolver}, canActivate: [RouteGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
