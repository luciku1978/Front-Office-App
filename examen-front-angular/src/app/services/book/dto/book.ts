import { RoomDto } from '../../room/dto/roomDto';
import { UserDTO } from '../../user/dto/userDTO';

export class BookDto {
  startDate: Date;
  endDate: Date;
  roomID: number;
  userID: number;

  constructor(room: RoomDto, user: UserDTO) {
    var currDate = new Date();
    this.startDate = currDate;
    this.endDate = currDate;
    this.roomID = room.id;
    this.userID = user.id;
    
  }
}
