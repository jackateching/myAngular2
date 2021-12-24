import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { HomeComponent } from './components/home/home.component';
import { LogComponent } from './components/log/log.component';
import { AuthComponent } from './components/auth/auth.component';
import { EditRoomComponent } from './components/edit-room/edit-room.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AuthGuard } from './components/auth/auth.guard';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  {path:'', redirectTo:'auth', pathMatch:'full'},
  {canActivate:[AuthGuard],
    path:'home', component:HomeComponent, 
    },
  {path:'auth', component:AuthComponent},
  {path:'log', component:LogComponent},
  {path:'create-room', component:CreateRoomComponent},
  {path:'edit-room', component:EditRoomComponent},
  {path:'edit-room/:id/:name/:floor/:balcony/:bathTub/:price', component:EditRoomComponent},
  {path:'manage-users', component:ManageUsersComponent},
  {path:'map', component:MapComponent},
  {path:'edit-user/:id/:username/:status/:level', component:EditUserComponent},
  // /:balcony/:bathTub/:price
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
