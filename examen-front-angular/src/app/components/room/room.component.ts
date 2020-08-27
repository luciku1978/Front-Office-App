import { Component, OnInit } from "@angular/core";
import { RoomService } from 'src/app/services/room/room-service';
import { RoomDto } from 'src/app/services/room/dto/roomDto';
import { MatDialog } from '@angular/material';
import { BookComponent } from '../booking/book/book.component';
import { ActivatedRoute } from '@angular/router';
import { RoomTypeEnum } from 'src/app/services/room/dto/roomTypeDTO';
import * as moment from 'moment';
import { BookingService } from '../../services/book/bookings.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'room-cmp',
  templateUrl: './room.component.html'
})
export class RoomComponent implements OnInit {
  rooms: RoomDto[] = [];
  selectedType: RoomTypeEnum;
  user: any;
  constructor(
    private bookingService: BookingService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private roomService: RoomService) {
    this.route.params.subscribe(params => {
      this.selectedType = params['type'] as RoomTypeEnum;
      this.getRooms();
      this.user = JSON.parse(localStorage.getItem('currentUser'))

    });
  }

  ngOnInit() {
    this.getRooms();
  }

  getRooms() {
    this.roomService.getRooms(this.selectedType).subscribe(rsp => {
      this.rooms = rsp;
    });
  }

  reserve(data) {
    console.log(data)
    const newData = {
      bookingStatus: "New",
      endDate: new Date(),
      persNumber: 1,
      room: { id: 1, roomNo: data.roomNo },
      roomID: data.id,
      showEndDate: moment().format('DD/MM/YYYY'),
      showStartDate: moment().format('DD/MM/YYYY'),
      startDate: new Date(),
      user: { id: this.user.id, firstName: this.user.firstName, lastName: this.user.lastName },
      userID: this.user.id
    }
    let dialogRef = this.dialog.open(BookComponent, {
      height: '600px',
      width: '600px',
      data: {
        room: { data: newData },
        asReception: this.user.userRole === "Admin" || this.user.userRole === "FOStaff" ? true : false
      },

    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.bookingService.saveBookingAdm(result).then(() => {
          console.log('finished')
          this.toastr.success(`Room ${result.room.roomNo} has been reserved!`, '', {
            positionClass: 'toast-up-right',
          });
        })
        console.log(result)
      }

      return

    });

  }
}
