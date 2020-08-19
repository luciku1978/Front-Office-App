import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UserDTO } from 'src/app/services/user/dto/userDTO';
import { UserService } from 'src/app/services/users.service';

@Component({
    selector: 'users-select',
    templateUrl: './users-select.html'
})
export class UsersSelect implements OnInit {
    model: string;
    // userId: number;
    @Input()
    selected;

    @Output()
    selectedChange: EventEmitter<UserDTO> = new EventEmitter<UserDTO>();
    items: UserDTO[] = [];

    constructor(private users: UserService) { }
    ngOnInit() {
        this.getTypes();
    }

    getTypes() {
        this.users.getSelectableUsers().then(rsp => {
            this.items = rsp;
            if (!this.selected) {
                this.selected = this.items[0];
                this.model = this.selected.id
                this.selectedChange.emit(this.selected);
            }

        });
    }

    change(e) {
        this.selected = this.items.find(x => x.id === e);
        this.selectedChange.emit(this.selected);
    }
}