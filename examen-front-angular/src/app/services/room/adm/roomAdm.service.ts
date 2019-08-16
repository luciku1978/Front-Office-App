import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RoomAdmDTO } from './dto/roomAdmDTO';

@Injectable({ providedIn: 'root' })
export class RoomAdmService {
  base: string = environment.srv_url + "api/roomAdm/";

  constructor(private http: HttpClient) { }


  getRooms(){
      return this.http.get<RoomAdmDTO[]>(this.base + 'getRooms');
  }

  upsertRoom(room:RoomAdmDTO) {
    return this.http.post(this.base + 'upsertRoom',room);
  }
}