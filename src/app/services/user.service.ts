import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Headers, Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';





@Injectable({
  providedIn: 'root'
})
export class UserService {



  users: User[];

  constructor(private http: HttpClient
    //TODO: Implement authentication service 
  ) {

    this.fetchUsers();

  }

  public createUserFromObject(obj): User {

    // TODO: Get online status from obj
    return new User(obj._id, obj.name, true, obj.balance, obj.publicKey);
  }


  public fetchUsers(): Promise<User[]> {
    
    return new Promise<User[]>((res, rej) => {
      this.http.get<any>(environment.apiUrl + '/user')
      .toPromise()
      .then(result => {
        res(result.users.map(x=>this.createUserFromObject(x)));
      })
      .catch(e => rej(e));
    });
  }
}
  

