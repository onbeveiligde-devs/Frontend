import {Injectable} from '@angular/core';
import {User} from '../models/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CryptoService} from './crypto.service';
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private headers;
  private privateKey: CryptoKey;
  private publicKey: CryptoKey;

  constructor(private http: HttpClient, private crypto: CryptoService, private userService: UserService, private router: Router) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
  }

  isLoggedIn(): boolean {
    return !!this.privateKey;
  }

  getPrivateKey(): CryptoKey {
    return this.privateKey;
  }

  getPublicKey(): CryptoKey {
    return this.publicKey;
  }

  setPrivateKey(key: CryptoKey) {
    if(key == null) {
      this.privateKey = null;
      localStorage.removeItem('privateKey');
    } else {
      this.privateKey = key;
      this.crypto.wrapKey(key)
        .then(wrappedKey => {
          localStorage.setItem('privateKey', wrappedKey);
        });
    }
  }

  setPublicKey(key: CryptoKey) {
    if(key == null) {
      this.publicKey = null;
      localStorage.removeItem('publicKey');
    } else {
      this.publicKey = key;
      this.crypto.wrapKey(key)
        .then(wrappedKey => {
          localStorage.setItem('publicKey', wrappedKey);
        });
    }
  }

  checkLocalStorage(): Promise<boolean> {
    console.log('Checking local storage...');
    return new Promise<boolean>((res, rej) => {
      if(this.isLoggedIn()) {
        res(true);
        return;
      }
      let wrappedPrivateKey = localStorage.getItem('privateKey');
      let wrappedPublicKey = localStorage.getItem('publicKey');

      console.log('Stored priv key = ' + wrappedPrivateKey);
      console.log('Stored publ key = ' + wrappedPublicKey);

      if (!wrappedPrivateKey || !wrappedPublicKey) {
        res(false);
        return;
      }

      this.crypto.unwrapKey(wrappedPrivateKey, true)
        .then(privateKey => {
          // private key is valid, unwrapping public key...
          this.crypto.unwrapKey(wrappedPublicKey, false)
            .then(publicKey => {
              // both stored keys are valid, cache them
              this.setPrivateKey(privateKey);
              this.setPublicKey(publicKey);
              res(true);
            })
            .catch(_ => res(false));
        })
        .catch(_ => res(false));
    })
  }

  logout(): void {
    this.setPrivateKey(null);
    this.setPublicKey(null);
  }

  login(wrappedPrivateKey, wrappedPublicKey): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {

      let unwrappedPrivateKey, unwrappedPublicKey;
      try {
        unwrappedPrivateKey = await this.crypto.unwrapKey(wrappedPrivateKey, true);
        unwrappedPublicKey = await this.crypto.unwrapKey(wrappedPublicKey, false);
      } catch {
        reject('invalid keys');
        return;
      }
      let sign = await this.crypto.sign('login', unwrappedPrivateKey);

      this.http.post<any>(environment.apiUrl + '/user/login', {
        publicKey: wrappedPublicKey,
        command: 'login',
        sign: sign
      }, {headers: this.headers})
        .toPromise()
        .then(result => {
          if (result.success) {
            this.setPrivateKey(unwrappedPrivateKey);
            this.setPublicKey(unwrappedPublicKey);
          }
          resolve(result.success);
        })
        .catch(e => reject(e));
    });
  }

  register(name): Promise<User> {
    return new Promise(async (resolve, reject) => {
      let keyPair = await this.crypto.generateKeyPair();
      let sign = await this.crypto.sign(name, keyPair.privateKey);
      let wrappedPublicKey = await this.crypto.wrapKey(keyPair.publicKey);

      this.http.post<any>(environment.apiUrl + '/user/register', {
        publicKey: wrappedPublicKey,
        name: name,
        sign: sign
      }, {headers: this.headers})
        .toPromise()
        .then(result => {
          this.setPrivateKey(keyPair.privateKey);
          this.setPublicKey(keyPair.publicKey);
          resolve(this.userService.createUserFromObject(result.user));
        })
        .catch(e => reject(e));
    });

  }

}
