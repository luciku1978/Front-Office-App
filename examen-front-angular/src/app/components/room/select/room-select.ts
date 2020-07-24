import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UserDTO } from 'src/app/services/user/dto/userDTO';
import { UserService } from 'src/app/services/users.service';
import { RoomDto } from 'src/app/services/room/dto/roomDto';
import { RoomService } from 'src/app/services/room/room-service';

@Component({
    selector: 'room-select',
    templateUrl: './room-select.html'
})
export class RoomSelect implements OnInit {
    model:string;
    @Input()
    selected:RoomDto;

    @Output()
    selectedChange:EventEmitter<RoomDto> = new EventEmitter<RoomDto>();
    items:RoomDto[] = [];

    constructor(private roomService:RoomService) {}
    ngOnInit() {
        this.getTypes();
    }

    getTypes() {
        this.roomService.getSelectableRooms().then(rsp => {
            this.items = rsp;
            if(!this.selected)
                this.selected = this.items[0];
            this.model = this.selected.name;
        });
    }

    change() {
        this.selected = this.items.find(x=> x.name == this.model);
        this.selectedChange.emit(this.selected);
    }
}