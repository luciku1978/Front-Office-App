import { Injectable } from "@angular/core";
import { RoomDto, RoomTypeEnum, RoomTypeDTO } from './dto/roomDto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RoomService {
  base: string = environment.srv_url + "api/rooms/";

  constructor(private http: HttpClient) { }

  getRooms(): RoomDto[] {
    return [
      {
        id: 1,
        name: 'Room 1',
        places: 1,
        type: {
          name: 'Single',
          type: RoomTypeEnum.Single
        }
      },
      {
        id: 2,
        name: 'Room 2',
        places: 2,
        type: {
          name: 'Double',
          type: RoomTypeEnum.Double
        }
      },
      {
        id: 3,
        name: 'Room 3',
        places: 3,
        type: {
          name: 'Suite',
          type: RoomTypeEnum.Suite
        }
      }] as RoomDto[];
  }

  getRoomTypes() {
    return this.http.get < RoomTypeDTO[]>(this.base + 'getCategories');
  }

  getImgPath(image) {
    return this.base + 'GetImageForCategory?image=' + image;
  }
}
