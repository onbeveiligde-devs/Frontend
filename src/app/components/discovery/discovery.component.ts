import { MatCardModule } from '@angular/material';
import { User } from './../../models/User';
import { Component, OnInit } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component'
import { Router } from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.css']
})
export class DiscoveryComponent implements OnInit {



  users : User[];
  onlineUsers : User[];

  constructor(private router : Router, private userService: UserService) { }

  async ngOnInit() {


    //TODO: Implement service to retrieve all users

    this.users = await this.userService.fetchAll();
    this.onlineUsers=[];

    this.onlineUsers = this.users.filter(x=> x.online)


  }

  recordStream(){
    this.router.navigate(['/record'])
  }

  watchStream(id : string){
    this.router.navigate(['/follow/' + id])

  }

}
