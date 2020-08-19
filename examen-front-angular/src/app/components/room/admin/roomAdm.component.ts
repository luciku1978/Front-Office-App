import { Component, OnInit, ViewChild } from "@angular/core";
import { RoomAdmService } from 'src/app/services/room/adm/roomAdm.service';
import { RoomAdmDTO } from 'src/app/services/room/adm/dto/roomAdmDTO';
import { MatDialog, MatPaginator } from '@angular/material';
import { AddRoomComponent } from './add/add-room.component';

@Component({
  selector: 'room-adm-cmp',
  templateUrl: './roomAdm.component.html',
  styleUrls: ['./roomAdm.component.scss']
})
export class RoomAdmComponent implements OnInit {
  rooms: RoomAdmDTO[] = [];
  constructor(private roomAdmService: RoomAdmService,
    private dialog: MatDialog) {
        }
        @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
        public displayedColumns: string[] = ['roomNo', 'roomType', 'description', 'status', 'Options'];
  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.roomAdmService.getRooms().subscribe(rsp => {
      this.rooms = rsp;
    });
  }

  upsert(room: RoomAdmDTO) {
    let dialogRef = this.dialog.open(AddRoomComponent, {
      height: '400px',
      width: '600px',
      data: {
        room: room? JSON.parse(JSON.stringify(room)):null
      }
    });

    dialogRef.componentInstance.onRoomUpserted.subscribe(_ => {
      this.getItems();
    });
  }
}
