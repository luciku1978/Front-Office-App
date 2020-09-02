import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users';
import { UserService } from 'src/app/services/users.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { findIndex } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

export interface DialogData {
  username: string;

  userRole: string;
  email: string;

  
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  username: string;
  userRole: string;
  email: string;
  firstName: string;
  lastName: string;
  public users: any = null;
  public changes: any = null;
  // blockFO: any;
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public displayedColumns: string[] = ['username', 'email', 'userRole', 'options'];


  constructor(public dialog: MatDialog, private userService: UserService, private route: Router,public authService: AuthService,) {
    this.getAllUsers();
  }

  openDialog(username, firstName, lastName, email, userRole, id): void {
    
    
    const dialogRef = this.dialog.open(UserEditDialog, {
      width: '300px',
      data: { username, firstName, lastName, email, userRole, id }

    });
    
    
    // this.blockFO = this.authService.currentUserValue.userRole === 'FOStaff' ? false : true

    

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        const { username, firstName, lastName, email, userRole, id } = result
        const userIndex = this.users.filteredData.findIndex((u) => {
          return u.id === id
        })
        console.log(this.users, userIndex)
        this.users.filteredData[userIndex].username = username
        this.users.filteredData[userIndex].firstName = firstName
        this.users.filteredData[userIndex].lastName = lastName
        this.users.filteredData[userIndex].email = email
        this.users.filteredData[userIndex].userRole = userRole
        this.userService.updateOneUser(username, firstName, lastName, email, userRole, id).subscribe(u => {
          console.log(u);
        });
      }
      return
    });
  }

  ngOnInit() {
   
  }

  getAllUsers() {

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
export class UserEditDialog  {
  // blockFO: any;


  constructor(
    public dialogRef: MatDialogRef<UserEditDialog>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 

     
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  
}

