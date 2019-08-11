import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { UsersGuard } from './guards/users.guard';
import { RoomComponent } from './components/room/room.component';
import { RoomTypeComponent } from './components/room/room-type.component';



const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [UsersGuard],

      },
      {
        path: 'room-type',
        component: RoomTypeComponent,
      },
      {
        path: 'room/:type',
        component: RoomComponent
      }
    ]
  },
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'register',
  component: RegisterComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

