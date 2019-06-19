import { MatCardModule } from '@angular/material';
import { User } from './../../models/User';
import { Component, OnInit } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component'
import { Router } from '@angular/router';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.css']
})
export class DiscoveryComponent implements OnInit {



  users : User[];
  onlineUsers : User[];

  constructor(private router : Router ) { }

  ngOnInit() {


    //TODO: Implement service to retrieve all users

    this.users=[];
    this.onlineUsers=[];

    let user1 = new User("id1", "user 1", true, 100, "privkey1");
    let user2 = new User("id2", "user 2", true, 200, "privkey2");
    let user3 = new User("id3", "user 3", false, 300, "privkey3");
    let user4 = new User("id4", "user 4", true, 400, "privkey4");
    
    this.users.push(user1,user2,user3,user4)
    this.onlineUsers = this.users.filter(x=> x.online)


  }

  recordStream(){
    this.router.navigate(['/record'])
  }

  watchStream(id : string){
    this.router.navigate(['/follow/' + id])

  }

}
