import { RoomTypeDTO } from '../../dto/roomTypeDTO';

export class RoomAdmDTO
{
    id:number;
    description:string;
    available:boolean;
    price:number;
    type:RoomTypeDTO;
    roomNo:string;
}