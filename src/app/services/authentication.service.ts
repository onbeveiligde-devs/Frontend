import { Injectable } from '@angular/core';
import {User} from '../models/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CryptoService} from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private headers;

  constructor(private http: HttpClient, private crypto: CryptoService) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  login(privateKey, publicKey): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {

      let unwrappedPublicKey = await this.crypto.unwrapKey(publicKey);
      let sign = await this.crypto.sign('login', privateKey);

      this.http.post<any>(environment.apiUrl + '/user/login', {
        publicKey: unwrappedPublicKey,
        command: 'login',
        sign: ''
      }, {headers: this.headers})
        .toPromise()
        .then(result => resolve(result.success))
        .catch(e => reject(e));
    });
  }
}
