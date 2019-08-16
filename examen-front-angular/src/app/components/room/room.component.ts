import { Component, OnInit } from "@angular/core";
import { RoomService } from 'src/app/services/room/room-service';
import { RoomDto } from 'src/app/services/room/dto/roomDto';
import { MatDialog } from '@angular/material';
import { BookComponent } from './book/book.component';
import { ActivatedRoute } from '@angular/router';
import { RoomTypeEnum } from 'src/app/services/room/dto/roomTypeDTO';

@Component({
  selector: 'room-cmp',
  templateUrl: './room.component.html'
})
export class RoomComponent implements OnInit {
  rooms: RoomDto[] = [];
  selectedType: RoomTypeEnum;
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private roomService: RoomService) {
    this.route.params.subscribe(params => {
      this.selectedType = params['type'] as RoomTypeEnum;
      this.getRooms();
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

  book(room) {
    let dialogRef = this.dialog.open(BookComponent, {
      height: '400px',
      width: '600px',
      data: {
        room: room
      }
    });
  }
}
