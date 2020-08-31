import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  permcl: any;
  permfo: any;
  permadm: any;
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.permcl = this.authService.currentUserValue.userRole === 'Client' ? false : true
    this.permfo = this.authService.currentUserValue.userRole === 'FOStaff' ? false : true
    this.permadm = this.authService.currentUserValue.userRole === 'Admin' ? false : true
  }

  home() {
    this.router.navigate(['']);
  }

  userManagement() {
    this.router.navigate(['/users']);
  }

  gotoRoom() {
    this.router.navigate(['/room-type']);
  }

  goToUserPerm() {
    this.router.navigate(['/perm-adm']);
  }

  gotoRoomAdm() {
    this.router.navigate(['/room-adm']);
  }

  gotoBookingAdm() {
    this.router.navigate(['/booking-adm']);
  }

  logout() {

    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
