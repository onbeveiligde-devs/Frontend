import { Injectable } from '@angular/core';
import { User } from '../models/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {promise} from 'selenium-webdriver';
import Promise = promise.Promise;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  fetchAll(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      this.http.get<any>(environment.apiUrl + '/user', {headers: this.headers})
        .toPromise()
        .then(results => resolve(results.map(user => new User(user._id, user.publicKey, user.name, user.balance))))
        .catch(e => reject(e));
    });
  }

}
