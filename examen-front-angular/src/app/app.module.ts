import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from './modules/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent, UserEditDialog } from './components/users/users.component';
import { MatPaginatorModule, MatTableModule, MatSortModule, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatNativeDateModule } from '@angular/material';
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
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';


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
    UserEditDialog,
    JwPaginationComponent
  ],
  entryComponents: [
    BookComponent,
    AddRoomComponent,
    UserEditDialog
  ],
  imports: [
    MatDatepickerModule,
    MatMomentDateModule,
    BrowserModule,
    MatTableModule,
    MatSortModule,
    MatNativeDateModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    ToastrModule.forRoot(),
    

  ],
  providers: [ { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true }}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
