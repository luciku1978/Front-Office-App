import { OnInit, Component, Inject } from '@angular/core';
import { RoomDto } from 'src/app/services/room/dto/roomDto';
import { MAT_DIALOG_DATA } from '@angular/material';
import { BookDto } from 'src/app/services/book/dto/book';

@Component({
  selector: 'book-cmp',
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {
  room: RoomDto;
  book: BookDto = new BookDto();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.room = data.room as RoomDto;
    this.book.roomID = this.room.id;
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
}
