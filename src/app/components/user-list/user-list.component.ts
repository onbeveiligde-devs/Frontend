import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {UserService} from '../../services/user.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  private _interval: any;
  users: User[];

  constructor(private userService: UserService) {

  }

  async ngOnInit() {
    this.users = await this.userService.fetchUsers();
    this._interval = setInterval(async () => {
      this.users = await this.userService.fetchUsers();
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this._interval);
  }



  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
