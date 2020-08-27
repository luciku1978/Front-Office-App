import { RoomDto } from '../../room/dto/roomDto';
import { UserDTO } from '../../user/dto/userDTO';

export class BookDto {
  bookingStatus: String;
  id: number;
  room: {
    id: number,
    roomNo: String
  }
  user: {
    id: number,
    firstName: String,
    lastName: String
  }
  startDate: Date;
  endDate: Date;
  roomID: number;
  userID: number;
  persNumber: number;


  constructor(room: RoomDto, user: UserDTO) {
    var currDate = new Date();
    this.startDate = currDate;
    this.endDate = currDate;
    this.roomID = room.id;
    this.userID = user.id;
    this.persNumber = 1;
  }


}
