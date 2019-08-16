import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RoomTypeDTO, RoomTypeEnum } from './dto/roomTypeDTO';
import { RoomDto } from './dto/roomDto';

@Injectable({ providedIn: 'root' })
export class RoomService {
  base: string = environment.srv_url + "api/rooms/";

  constructor(private http: HttpClient) { }

  getRooms(type:RoomTypeEnum) {
    return this.http.get < RoomDto[]>(this.base + 'getRooms?type=' + type);
  }

  getRoomTypes() {
    return this.http.get < RoomTypeDTO[]>(this.base + 'getCategories');
  }

  getImgPath(image) {
    return this.base + 'GetImageForCategory?image=' + image;
  }
}
