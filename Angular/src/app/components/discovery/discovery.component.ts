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

  private _intervalHandler: any;

  users : User[];
  onlineUsers : User[];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getCachedUsers();
    this.onlineUsers = this.users.filter(x => x.online);
    this._intervalHandler = setInterval( () => {
      this.users = this.userService.getCachedUsers();
      this.onlineUsers = this.users.filter(x => x.online);
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this._intervalHandler);
  }

  recordStream(){
    this.router.navigate(['/record'])
  }

  watchStream(id : string){
    this.router.navigate(['/follow/' + id])

  }

}
