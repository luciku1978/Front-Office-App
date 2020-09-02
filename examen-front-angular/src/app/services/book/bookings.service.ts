import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BookDTO } from './dto/bookDTO';
import { HttpClient } from '@angular/common/http';
import { format } from 'url';

@Injectable({ providedIn: 'root' })
export class BookingService {
  base: string = environment.srv_url + "api/bookings/";

  constructor(private http: HttpClient) { }

  getBookingsAdm() {
    return this.http.get<BookDTO[]>(this.base + 'getBookingsAdm').toPromise();
  }

  saveBookingAdm(book) {
    const newBook = {
      startDate: book.startDate,
      endDate: book.endDate,
      userID: book.userID,
      roomID: book.roomID,
      bookingStatus: 'New',
      persNumber: book.persNumber
    }
    console.log(newBook)
    return this.http.post(this.base + 'upsertBookingReception', newBook).toPromise().then((res) => {
      console.log(res)
    });
  }

  updateBookingAdm(book) {
    console.log(book)
    const updatedBook = {
      id: book.id,
      startDate: book.startDate,
      endDate: book.endDate,
      userID: book.userID,
      roomID: book.roomID,
      bookingStatus: book.bookingStatus,
      persNumber: book.persNumber
    }
    console.log(updatedBook)
    return this.http.post(this.base + 'upsertBookingReception', updatedBook).toPromise().then((res) => {
      console.log(res)
    });
  }

}