import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) {

  }

  ngOnInit() {

    // this.users = [];
    // let user1 = new User("id1", "user 1", true, 100, "privkey1");
    // let user2 = new User("id2", "user 2", true, 200, "privkey2");
    // let user3 = new User("id3", "user 3", false, 300, "privkey3");
    // let user4 = new User("id4", "user 4", true, 400, "privkey4");

    // this.users.push(user1, user2, user3, user4);
    this.userService.fetchUsers().then(result => {
      this.users = result;
    });
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
