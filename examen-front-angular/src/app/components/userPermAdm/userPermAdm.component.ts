import { Component, OnInit } from "@angular/core";
import { UserAdmService } from 'src/app/services/user/user_adm.service';
import { UserPermAdmDTO } from 'src/app/services/user/dto/userPermAdmDTO';

@Component({
  selector: 'perm-adm-cmp',
  templateUrl: './userPermAdm.component.html'
})
export class UserPermAdmComponent implements OnInit {
  userPerms: UserPermAdmDTO[] = [];
  constructor(private userAdmService: UserAdmService) {

  }

  ngOnInit() {
    this.getPermissions();
  }

  getPermissions() {
    this.userAdmService.getPermissions().subscribe(rsp => {
      this.userPerms = rsp;
    });
  }

  savePerms(user: UserPermAdmDTO) {
    this.userAdmService.assignPermissions(user).subscribe(rsp => {
      alert("Perm saved");
      this.getPermissions();
    })
  }
}
