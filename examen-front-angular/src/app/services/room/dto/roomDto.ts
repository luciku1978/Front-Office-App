import { RoomTypeDTO } from './roomTypeDTO';

export class RoomDto {
  id: number;
  name: string;
  places: number;
  type: RoomTypeDTO;
  available: boolean
}

