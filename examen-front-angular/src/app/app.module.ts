import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from './modules/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent, DialogOverviewExampleDialog } from './components/users/users.component';
import { MatPaginatorModule } from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RoomComponent } from './components/room/room.component';
import { BookComponent } from './components/booking/book/book.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RoomTypeComponent } from './components/room/room-type.component';
import { UserPermAdmComponent } from './components/userPermAdm/userPermAdm.component';
import { RoomAdmComponent } from './components/room/admin/roomAdm.component';
import { AddRoomComponent } from './components/room/admin/add/add-room.component';
import { RoomTypeSelect } from './lib/select/room-type/room-type';
import { BookingAdmComponent } from './components/booking/booking-adm.component';
import { UsersSelect } from './components/users/select/users-select';
import { RoomSelect } from './components/room/select/room-select';
import { JwPaginationComponent } from 'jw-angular-pagination';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    LoginComponent,
    RegisterComponent,
    RoomComponent,
    RoomTypeComponent,
    UserPermAdmComponent,
    BookingAdmComponent,
    RoomAdmComponent,
    AddRoomComponent,
    RoomTypeSelect,
    UsersSelect,
    RoomSelect,
    BookComponent,
    DialogOverviewExampleDialog,
    JwPaginationComponent
  ],
  entryComponents: [
    BookComponent,
    AddRoomComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    MatDatepickerModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
