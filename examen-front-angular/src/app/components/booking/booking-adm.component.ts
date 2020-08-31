import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingService } from 'src/app/services/book/bookings.service';
import { BookDTO } from 'src/app/services/book/dto/bookDTO';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, MatDialogRef } from '@angular/material';
import { BookComponent } from './book/book.component';
import * as moment from 'moment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking-adm',
  templateUrl: './booking-adm.component.html',
  styleUrls: ['./booking-adm.component.scss']
})
export class BookingAdmComponent implements OnInit {
  user: any;
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public displayedColumns: string[] = ['id', 'room.roomNo', 'user.firstName', 'user.lastName', 'startDate', 'endDate', 'persNumber', 'bookingStatus', 'Options'];
  constructor(
    private bookingService: BookingService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser'))

  }

  ngOnInit() {
    this.getBookings().then((data: any) => {
      this.dataSource = new MatTableDataSource(data);

    })
  }



  ngAfterViewInit() {
    this.getBookings().then((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sortingDataAccessor = (item, property) => {
        if (property.includes('.')) return property.split('.').reduce((o, i) => o[i], item)
        return item[property];
      };
      setTimeout(() => { this.dataSource.sort = this.sort }, 0);

      //set a new filterPredicate function
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return this.nestedFilterCheck(currentTerm, data, key);
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        // Transform the filter by converting it to lowercase and removing whitespace.
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();


    }
  }

  //also add this nestedFilterCheck class function
  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  updateBookingState() {
    this.getBookings().then((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sortingDataAccessor = (item, property) => {
        if (property.includes('.')) return property.split('.').reduce((o, i) => o[i], item)
        return item[property];
      };
      setTimeout(() => { this.dataSource.sort = this.sort }, 0);

      //set a new filterPredicate function
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return this.nestedFilterCheck(currentTerm, data, key);
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        // Transform the filter by converting it to lowercase and removing whitespace.
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      }
    })
  }

  getBookings() {
    return new Promise((res, rej) => {
      this.bookingService.getBookingsAdm().then(rsp => {
        const theList = rsp.map((r) => (
          {
            bookingStatus: r.bookingStatus,
            showEndDate: moment(r.endDate).format('DD/MM/YYYY'),
            showStartDate: moment(r.startDate).format('DD/MM/YYYY'),
            endDate: r.endDate,
            startDate: r.startDate,
            id: r.id,
            persNumber: r.persNumber,
            room: r.room,
            user: r.user,
            userID: r.userID,
            roomID: r.roomID
          }
        ))
        res(theList)

        console.log(theList)
      })

    })

  }

  openUpdateDialog(data) {
    let dialogRef = this.dialog.open(BookComponent, {
      height: '600px',
      width: '600px',
      data: {
        room: { data },
        asReception: this.user.userRole === "Admin" || this.user.userRole === "FOStaff" ? true : false
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.bookingService.updateBookingAdm(result).then(() => {
          this.toastr.success(`Booking ${result.id} has been updated!`, '', {
            positionClass: 'toast-bottom-right',
          })
          this.updateBookingState()
          ;
        })
      }

      return
    });
  }

  upsertBooking() {
    let dialogRef = this.dialog.open(BookComponent, {
      height: '600px',
      width: '600px',
      data: {
        room: {
          data: {
            bookingStatus: "New",
            endDate: new Date(),
            persNumber: 1,
            room: { id: 1, roomNo: "" },
            roomID: 1,
            showEndDate: moment().format('DD/MM/YYYY'),
            showStartDate: moment().format('DD/MM/YYYY'),
            startDate: new Date(),
            user: { id: 1, firstName: "Maniu", lastName: "Lucian" },
            userID: 1
          }
        },
        asReception: this.user.userRole === "Admin" || this.user.userRole === "FOStaff" ? true : false
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.bookingService.saveBookingAdm(result).then(() => {
          this.updateBookingState()
          this.toastr.success(`Room ${result.room.roomNo} has been reserved!`, '', {
            positionClass: 'toast-top-right',
          });
        })
      }

      return

    });
  }
}