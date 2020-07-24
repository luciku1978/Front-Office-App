import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BookDTO } from './dto/bookDTO';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BookingService {
    base: string = environment.srv_url + "api/bookings/";

    constructor(private http: HttpClient) { }
  
    getBookingsAdm() {
      return this.http.get < BookDTO[]>(this.base + 'getBookingsAdm').toPromise();
    }
}