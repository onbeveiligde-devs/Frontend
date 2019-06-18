import { Injectable } from '@angular/core';
import {UtilService} from './util.service';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private util: UtilService) { }

  createKeys() {

  }

  sign(data: string, privateKey: CryptoKey): PromiseLike<ArrayBuffer> {
    return window.crypto.subtle.sign(
      {
        name: "ECDSA",
        hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
      },
      privateKey, //from generateKey or importKey above
      this.util.str2ab(data) //ArrayBuffer of data you want to sign
    );
  }

}
