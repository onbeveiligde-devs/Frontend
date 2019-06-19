import { MatCardModule } from '@angular/material';
import { User } from './../../models/User';
import { Component, OnInit } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component'

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.css']
})
export class DiscoveryComponent implements OnInit {

  constructor() { }

  private users : User[] = []
  ngOnInit() {

    const user1 = new User("user1","user1",true,10,"key");
    const user2 = new User("user1","user2",true,10,"key");
    const user3 = new User("user1","user3",true,10,"key");
    const user4 = new User("user1","user4",true,10,"key");
    
    this.users.push(user1,user2,user3,user4)
  }

}
