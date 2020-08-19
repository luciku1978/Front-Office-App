import { OnInit, Component, Inject } from '@angular/core';
import { RoomDto } from 'src/app/services/room/dto/roomDto';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { BookDto } from 'src/app/services/book/dto/book';
import { UserDTO } from 'src/app/services/user/dto/userDTO';
import { RoomService } from 'src/app/services/room/room-service';
import { BookingService } from 'src/app/services/book/bookings.service';

@Component({
  selector: 'book-cmp',
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {
  rooms: RoomDto[] = [];
  room: RoomDto;
  user: UserDTO;
  book: BookDto;
  asReception: boolean = false;
  constructor(private roomService: RoomService,private bookingService: BookingService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser'))
    console.log(this.user)
    this.room = data.room as RoomDto;
    this.book = new BookDto(this.room, { id: this.user.id, name: this.user.name, lastName: this.user.lastName });

    // this.book.roomID = this.room.id;
    this.asReception = data.asReception;
  }

  ngOnInit() {
    // this.getRooms()
  }

  save() {
    this.bookingService.saveBookingAdm(this.book)
    console.log(this.book);
  }

  startDateChange(ev) {
    this.book.startDate = ev.target.value as Date;
  }

  endDateChange(ev) {
    this.book.endDate = ev.target.value as Date;
  }

  roomIdChange(ev) {
    this.book.roomID = ev.target.value as number;
  }

  userIdChange(ev) {
    this.book.roomID = ev.target.value as number;
  }

  getRooms() {
    console.log(this.room.type.id)
    this.roomService.getRooms(this.room.type.id).subscribe(rsp => {
      this.rooms = rsp;
    });
  }
  roomSelect(e) {
    this.book = { ...this.book, roomID: e.id }
  }
  changePersNumber(persNumber) {
    this.book = { ...this.book, persNumber: parseInt(persNumber) }
  }

  userSelect(e) {
    this.book = { ...this.book, userID: e.id }
  }

  getRoomName() {
    return this.room.name;
  }

  getRoomPlaces() {
    return this.room.places;
  }
}
