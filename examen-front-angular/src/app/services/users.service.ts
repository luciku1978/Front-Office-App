import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/users';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersSubject: BehaviorSubject<User[]>;
  public users: User[];

  constructor(private http: HttpClient) {
    this.usersSubject = new BehaviorSubject<User[]>([]);
  }

  getAllUsers() {

      return this.http.get<User[]>(`https://localhost:44381/api/users`)
      .pipe(map(response => {
        this.users = response;
        this.usersSubject.next(this.users);
        return response;
      }));
  }

}
