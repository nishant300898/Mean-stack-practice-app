import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http'; 
import { ApiCallService } from './api-call.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import {JwtModule} from "@auth0/angular-jwt";
import {Router,CanActivate} from '@angular/router';
import { ViewListComponent } from './view-list/view-list.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
export function tokenGetter(){
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainComponent,
    ViewListComponent
  ],
  imports: [
        FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    DragDropModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:tokenGetter,
        whitelistedDomains:["localhost:3000"],
      }
    })
  ],
  providers: [ApiCallService],
  bootstrap: [AppComponent]
})
export class AppModule { }
