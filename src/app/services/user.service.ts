import { Injectable } from '@angular/core';
import { User } from '../models/User';
import {Headers, Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {



  users : User[];
  
  constructor(private http: HttpClient
    //TODO: Implement authentication service 
    ) {

  

   }


//    public getUuid(){
//     return new Promise<any>((res, rej) => {
//       this.http.get("nicks.rocks:3000"+ '/online')
//     .toPromise()
//     .then(result => {
//       res(console.log(result));
//     })
//     .catch(e => rej(e));
//    })
// }
}
