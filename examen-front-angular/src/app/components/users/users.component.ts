import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users';
import { UserService } from 'src/app/services/users.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  username: string;
  userRole: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  username: string;
  userRole: string;
  public users: any = null;
  public changes: any = null;

  public displayedColumns: string[] = ['Username', 'Email', 'UserRole', 'Butoane'];


  constructor(public dialog: MatDialog, private userService: UserService, private route: Router) {
    this.getAllUsers();
  }

  openDialog(username, userRole, i): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { username, userRole, i }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      const { username, userRole, i } = result
      this.users[i].username = username
      this.users[i].userRole = userRole
      //call backend=> cautam user dupa username, editam user
    });
  }

  ngOnInit() {
  }

  getAllUsers() {
    //this.users = []
    this.userService.getAllUsers().subscribe(u => {
      this.users = u;
      console.log(u);
    });
  }

  goBack() {
    this.route.navigate(['']);
  }
}

@Component({
  selector: 'userEdit.component',
  templateUrl: './userEdit.component.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}