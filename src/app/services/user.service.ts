import { Injectable } from '@angular/core';
import { User } from '../models/User';
import {Headers, Http} from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {



  users : User[];
  
  constructor(private http: Http,
    //TODO: Implement authentication service 
    ) {

      this.fetchUsers();

   }

   fetchUsers() {
  }
}
