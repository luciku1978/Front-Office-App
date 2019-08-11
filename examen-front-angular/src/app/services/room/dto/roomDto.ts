export class RoomDto {
  id: number;
  name: string;
  //base64 opt
  //img:
  places: number;
  type: RoomTypeDTO;
}

export class RoomTypeDTO {
  type: RoomTypeEnum;
  imgSrc: string;
  name: string;
}

//1 -1 cu ce e in backend
export enum RoomTypeEnum {
  Single = 1,
  Double = 2,
  Suite = 3
}
