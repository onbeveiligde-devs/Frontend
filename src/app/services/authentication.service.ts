import { Injectable } from '@angular/core';
import {User} from '../models/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {promise} from 'selenium-webdriver';
import Promise = promise.Promise;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private headers;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  login(privateKey, publicKey): Promise<boolean> {
    return new Promise<User[]>((resolve, reject) => {
      this.http.post<any>(environment.apiUrl + '/user/login', {}, {headers: this.headers})
        .toPromise()
        .then(results => resolve(results.map(user => new User(user._id, user.publicKey, user.name, user.balance))))
        .catch(e => reject(e));
    });
  }
}
