import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDTO } from './user/dto/userDTO';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  base: string = environment.srv_url + "api/users/";
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
        console.log(response)
        return response;
      }));
  }
  getSelectableUsers() {
    return this.http.get<UserDTO[]>(this.base + 'getSelectableUsers').toPromise();
  }

  updateOneUser(username,firstName, lastName, email, role, userId) {
    return this.http.post<User[]>('https://localhost:44381/api/users/updateuser', {Username: username ,FirstName: firstName, LastName: lastName,Email:email, UserRole:role, Id:userId})
    .pipe(map(response => {
    
      return response;
    }));
  }

}
