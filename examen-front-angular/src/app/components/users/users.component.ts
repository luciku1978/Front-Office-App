import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users';
import { UserService } from 'src/app/services/users.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { findIndex } from 'rxjs/operators';

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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public displayedColumns: string[] = ['Username', 'Email', 'UserRole', 'Options'];


  constructor(public dialog: MatDialog, private userService: UserService, private route: Router) {
    this.getAllUsers();
  }

  openDialog(username, userRole, id): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { username, userRole, id }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        const { username, userRole, id } = result
        const userIndex =this.users.filteredData.findIndex((u) => {
          return u.id === id
        })
        console.log(this.users, userIndex)
        this.users.filteredData[userIndex].username = username
        this.users.filteredData[userIndex].userRole = userRole
        this.userService.updateOneUser(username, userRole, id).subscribe(u => {
          console.log(u);
        });
      }
      return
    });
  }

  ngOnInit() {

  }

  getAllUsers() {
    //this.users = []
    this.userService.getAllUsers().subscribe(u => {
      this.users = new MatTableDataSource(u);
      this.users.paginator = this.paginator;
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

//@Component({
  //selector: 'paginator-overview-example',
  //templateUrl: 'paginator-overview-example.html',
//})
//export class PaginatorOverviewExample {}