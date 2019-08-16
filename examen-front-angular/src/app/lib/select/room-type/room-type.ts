import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { RoomService } from 'src/app/services/room/room-service';
import { RoomTypeDTO } from 'src/app/services/room/dto/roomTypeDTO';

@Component({
    selector: 'room-type-select',
    templateUrl: './room-type.html'
})
export class RoomTypeSelect implements OnInit {
    model:string;
    @Input()
    selected:RoomTypeDTO;

    @Output()
    selectedChange:EventEmitter<RoomTypeDTO> = new EventEmitter<RoomTypeDTO>();
    types:RoomTypeDTO[] = [];

    constructor(private roomService:RoomService) {}
    ngOnInit() {
        this.getTypes();
    }

    getTypes() {
        this.roomService.getRoomTypes().subscribe(rsp => {
            this.types = rsp;
            if(!this.selected)
                this.selected = this.types[0];
            this.model = this.selected.name;

        });
    }

    change() {
        this.selected = this.types.find(x=> x.name == this.model);
        this.selectedChange.emit(this.selected);
    }
}