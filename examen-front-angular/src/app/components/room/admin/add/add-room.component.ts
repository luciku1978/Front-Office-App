import { OnInit, Component, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { RoomAdmDTO } from 'src/app/services/room/adm/dto/roomAdmDTO';
import { RoomAdmService } from 'src/app/services/room/adm/roomAdm.service';
import { RoomTypeDTO } from 'src/app/services/room/dto/roomTypeDTO';

@Component({
  selector: 'add-room-cmp',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit {
  room: RoomAdmDTO;
  onRoomUpserted: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roomAdmService: RoomAdmService
  ) {
    this.room = data.room as RoomAdmDTO;
    if (!this.room) {
      this.room = new RoomAdmDTO();
      console.log('new ROOM', this.room)
    }


  }

  ngOnInit() {
    console.log(this.room)
  }

  changeDescription(value) {
    this.room.description = value
  }

  changePrice(value) {
    this.room.price = value
  }

  changeRoomNo(value) {
    this.room.roomNo = value
  }


  save() {
    this.roomAdmService.upsertRoom(this.room).subscribe(rsp => {
      this.onRoomUpserted.emit();
    });
  }

  onRoomTypeChange(ev) {
    this.room.type = ev as RoomTypeDTO;
  }

  // onNoClick(): void {
  //   this.room.closed()
  // }

}
