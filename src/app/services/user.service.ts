import {Injectable} from '@angular/core';
import {User} from '../models/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers: HttpHeaders;
  private users: User[];

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.users = [];
  }

  public createUserFromObject(obj): User {
    return new User(obj._id, obj.name, false, obj.balance, obj.publicKey, '');
  }


  public fetchUsers(): Promise<User[]> {

    return new Promise<User[]>((res, rej) => {
      this.http.get<any>(environment.apiUrl + '/user')
        .toPromise()
        .then(result => {
          let users = result.users.map(x => this.createUserFromObject(x));

          this.http.get<any>(environment.apiUrl + '/online')
            .toPromise()
            .then(result => {
              for (let i = 0; i < result.streams.length; i++) {
                let channelStatus = result.streams[i];
                console.log(channelStatus.name + ' is streaming');
                for (let j = 0; j < users.length; j++) {
                  let user = users[j];
                  if (channelStatus.isOnAir && user.id === channelStatus.name) {
                    user.online = true;
                    break;
                  }
                }
              }
              res(users);
            });

        })
        .catch(e => rej(e));
    });
  }


  public searchUserById(id: String) {
    return this.users.find(x => x.id == id);
  }

}



