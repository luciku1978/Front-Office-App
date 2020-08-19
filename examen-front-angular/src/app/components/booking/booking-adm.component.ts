import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingService } from 'src/app/services/book/bookings.service';
import { BookDTO } from 'src/app/services/book/dto/bookDTO';
import { MatDialog, MatPaginator } from '@angular/material';
import { BookComponent } from './book/book.component';
import * as moment from 'moment';
@Component({
  selector: 'app-booking-adm',
  templateUrl: './booking-adm.component.html',
  styleUrls: ['./booking-adm.component.scss']
})
export class BookingAdmComponent implements OnInit {
  user: any;
  list: BookDTO[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public displayedColumns: string[] = ['id', 'roomNo', 'firstName', 'lastName', 'startDate','endDate', 'persNumber', 'status', 'Options'];

  constructor(private bookingService: BookingService,
    private dialog: MatDialog) {
    this.user = JSON.parse(localStorage.getItem('currentUser'))

  }
  ngOnInit() {
    this.getBookings();
  }

  getBookings() {
    this.bookingService.getBookingsAdm().then(rsp => {
      this.list = rsp.map((r) => (
       {
          bookingStatus: r.bookingStatus,
          endDate: moment(r.endDate).format('DD/MM/YYYY'),
          startDate: moment(r.startDate).format('DD/MM/YYYY'),
          id: r.id,
          persNumber: r.persNumber,
          room: r.room,
          user: r.user,
          userID: r.userID,
          roomID: r.roomID
        }
     ))
      console.log(this.list)
    })
  }

  upsertBooking() {
    let dialogRef = this.dialog.open(BookComponent, {
      height: '400px',
      width: '600px',
      data: {
        room: {},
        asReception: this.user.userRole === "Admin" || this.user.userRole === "FOStaff" ? true : false
      }
    });
  }
}