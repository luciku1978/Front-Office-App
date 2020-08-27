import { Component, OnInit } from "@angular/core";
import { UserAdmService } from 'src/app/services/user/user_adm.service';
import { UserPermAdmDTO } from 'src/app/services/user/dto/userPermAdmDTO';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'perm-adm-cmp',
  templateUrl: './userPermAdm.component.html'
})
export class UserPermAdmComponent implements OnInit {
  userPerms: UserPermAdmDTO[] = [];
  errors: string[] = [];
  constructor(private userAdmService: UserAdmService,
    private toastr: ToastrService
    ) {

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
      // this.toastr.success('Permission saved successfully!', '', {
      //   positionClass: 'toast-bottom-center',
      // });
      alert("Permission succesfully saved!");
      this.getPermissions();
    })
  }
}
