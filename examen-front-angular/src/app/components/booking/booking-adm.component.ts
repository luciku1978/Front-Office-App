import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/book/bookings.service';
import { BookDTO } from 'src/app/services/book/dto/bookDTO';
import { MatDialog } from '@angular/material';
import { BookComponent } from './book/book.component';

@Component({
    selector: 'app-booking-adm',
    templateUrl: './booking-adm.component.html',
    // styleUrls: ['./home.component.scss']
  })
  export class BookingAdmComponent implements OnInit {

    list:BookDTO[] = [];

    constructor(private bookingService:BookingService,
      private dialog: MatDialog) {}
    ngOnInit() {
        this.getBookings();
    }

    getBookings() {
      this.bookingService.getBookingsAdm().then(rsp => {
this.list = rsp;
      })
    }

    upsertBooking() {
      let dialogRef = this.dialog.open(BookComponent, {
        height: '400px',
        width: '600px',
        data: {
          room: {},
          asReception:true
        }
      });
    }
  }