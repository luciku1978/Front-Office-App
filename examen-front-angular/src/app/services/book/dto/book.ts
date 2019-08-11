export class BookDto {
  startDate: Date;
  endDate: Date;
  roomID: number;
  constructor() {
    var currDate = new Date();
    this.startDate = currDate;
    this.endDate = currDate;
  }
}
