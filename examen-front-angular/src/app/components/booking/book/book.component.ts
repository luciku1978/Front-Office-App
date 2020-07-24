import { OnInit, Component, Inject } from '@angular/core';
import { RoomDto } from 'src/app/services/room/dto/roomDto';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { BookDto } from 'src/app/services/book/dto/book';
import { UserDTO } from 'src/app/services/user/dto/userDTO';
import { RoomService } from 'src/app/services/room/room-service';


@Component({
  selector: 'book-cmp',
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {
  rooms: RoomDto[] = [];
  room: RoomDto;
  user: UserDTO;
  book: BookDto;
  asReception:boolean = false;
  constructor(private roomService: RoomService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser'))
    this.room = data.room as RoomDto;
   this.book = new BookDto(this.room,{id:this.user.id, name:this.user.name});

    this.book.roomID = this.room.id;
    this.asReception = data.asReception;
  }

  ngOnInit() {
  }

  save() {
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
    
    this.roomService.getRooms(this.room.type.id).subscribe(rsp => {
      this.rooms = rsp;
    });
  }

  getRoomName(){
    return this.room.name;
  }

  getRoomPlaces(){
    return this.room.places;
  }
}
