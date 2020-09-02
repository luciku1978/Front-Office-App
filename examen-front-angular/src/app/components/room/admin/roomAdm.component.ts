import { Component, OnInit, ViewChild } from "@angular/core";
import { RoomAdmService } from 'src/app/services/room/adm/roomAdm.service';
import { RoomAdmDTO } from 'src/app/services/room/adm/dto/roomAdmDTO';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AddRoomComponent } from './add/add-room.component';

@Component({
  selector: 'room-adm-cmp',
  templateUrl: './roomAdm.component.html',
  styleUrls: ['./roomAdm.component.scss']
})
export class RoomAdmComponent implements OnInit {
  user: any;
  dataSource: any;
  //rooms: RoomAdmDTO[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  public displayedColumns: string[] = ['roomNo', 'type.name', 'description', 'status', 'price', 'Options'];
  constructor(private roomAdmService: RoomAdmService,
    private dialog: MatDialog) {
    this.user = JSON.parse(localStorage.getItem('currentUser'))
  }


  ngOnInit() {
    // this.getItems();
    this.getRoomsAsList().then((data: any) => {
      this.dataSource = new MatTableDataSource(data);

    })
  }
  // getItems() {
  //   this.roomAdmService.getRooms().subscribe(rsp => {
  //     this.rooms = rsp;
  //   })
  // }

  ngAfterViewInit() {
    this.getRoomsAsList().then((data: any) => {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();


    }
  }

  updateBookingState() {
    this.getRoomsAsList().then((data: any) => {
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


  getRoomsAsList() {
    return new Promise((res, rej) => {
      this.roomAdmService.getRooms().then(rsp => {
        const roomList = rsp.map((r) => (
          {
            roomNo: r.roomNo,
            id: r.id,
            description: r.description,
            available: r.available,
            price: r.price,
            type: r.type,
            typeName: r.type.name,

          }
        ))
        res(roomList)

        console.log(roomList)
      })

    })

  }

  upsert(room) {
    console.log(room)
    let dialogRef = this.dialog.open(AddRoomComponent, {
      height: '600px',
      width: '600px',
      data: {
       room
      }
    });

    dialogRef.componentInstance.onRoomUpserted.subscribe(_ => {
      this.getRoomsAsList();
    });

    

  }

  

}
