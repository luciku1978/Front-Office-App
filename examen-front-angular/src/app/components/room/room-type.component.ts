import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room/room-service';
import { RoomTypeDTO } from 'src/app/services/room/dto/roomDto';
import { Router } from '@angular/router';

@Component({
  selector: 'rt',
  templateUrl: './room-type.component.html'
})
export class RoomTypeComponent implements OnInit {
  roomTypes: RoomTypeDTO[] = [];
  constructor(
    private router: Router,
    private roomService: RoomService) {

  }
  ngOnInit() {
    this.getRoomTypes();
  }

  getRoomTypes() {
    this.roomService.getRoomTypes().subscribe(rsp => {
      this.roomTypes = rsp;
    })
  }

  getImage(rt: RoomTypeDTO) {
    return this.roomService.getImgPath(rt.imgSrc);
  }

  go(type: RoomTypeDTO) {
    this.router.navigate(['./room', type.type]);
  }
}
