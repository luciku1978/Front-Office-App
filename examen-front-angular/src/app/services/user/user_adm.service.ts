import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserPermAdmDTO } from './dto/userPermAdmDTO';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserAdmService {
  base: string = environment.srv_url + "api/userPermAdm/";

  constructor(private http: HttpClient) {
  }

  getPermissions() {
    return this.http.get<UserPermAdmDTO[]>(this.base + 'getPermissions');
  }

  assignPermissions(user:UserPermAdmDTO) {
    return this.http.post(this.base + 'assignPermissions',user);
  }
}
