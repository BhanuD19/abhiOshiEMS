import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseService } from './services/firebase.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { HomeComponent } from './shared/home/home.component';
import { AvatarDialogComponent } from './shared/avatar-dialog/avatar-dialog.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { NewEmployeeComponent } from './employee/new-employee/new-employee.component';
import { EditEmployeeResolver } from './employee/edit-employee/edit-employee.resolver';
import { LoginComponent } from './shared/login/login.component';
import { PayslipGenComponent } from './employee/payslip-gen/payslip-gen.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AvatarDialogComponent,
    EditEmployeeComponent,
    NewEmployeeComponent,
    LoginComponent,
    PayslipGenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
   AngularFirestoreModule,
   MDBBootstrapModule.forRoot(),
   FormsModule,
    ReactiveFormsModule
  ],
  providers: [FirebaseService, EditEmployeeResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
