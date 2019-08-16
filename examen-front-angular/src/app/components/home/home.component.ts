import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {

    }

  ngOnInit() {
    // const currentRoute = this.router.url;

    // if (currentRoute === '/users') {
    //   this.router.navigate(['/users']);
    // } else {
    //   this.router.navigate(['/expenses']);
    // }
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

  logout() {
    
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
