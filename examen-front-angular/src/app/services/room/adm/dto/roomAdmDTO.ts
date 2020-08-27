import { RoomTypeDTO } from '../../dto/roomTypeDTO';

export class RoomAdmDTO {
    id: number;
    description: string;
    available: boolean;
    price: number;
    type: RoomTypeDTO;
    roomNo: string;

    constructor() {
        this.description = '';
        this.available = true;
        this.price = 100;
        this.type = { id: 0, name: 'Single' };
        this.roomNo = '101';
    }
}

