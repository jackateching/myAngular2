import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {Routes} from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogoHeaderComponent } from './components/logo-header/logo-header.component';
import { AuthComponent } from './components/auth/auth.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/Common/http';
import { HomeComponent } from './components/home/home.component';
import { LogComponent } from './components/log/log.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { NavComponent } from './components/nav/nav.component';
import { LoadingSpinnerComponent } from './components/shared/loading-spinner/loading-spinner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptorService } from './components/auth/auth-interceptor-service';
import { EditRoomComponent } from './components/edit-room/edit-room.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './components/map/map.component';
import { AgmCoreModule } from '@agm/core';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    LogoHeaderComponent,
    AuthComponent,
    HomeComponent,
    LogComponent,
    CreateRoomComponent,
    NavComponent,
    LoadingSpinnerComponent,
    EditRoomComponent,
    ManageUsersComponent,
    EditUserComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyDa0RMDdr3ODypKSQNVylmPUBGGp3pmtc4'
    }),
    NgxPaginationModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
